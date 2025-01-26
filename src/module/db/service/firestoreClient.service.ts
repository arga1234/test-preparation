import { IDatabaseClient, IWhereClause } from '../repository';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { Firestore, Query, DocumentData } from 'firebase/firestore';

export class FirestoreClient<T> implements IDatabaseClient<T> {
  private firestore: Firestore;
  private collectionName: string;

  constructor(firestore: Firestore, collectionName: string) {
    this.firestore = firestore;
    this.collectionName = collectionName;
  }

  async getSingle(
    whereClause: IWhereClause,
    columns?: (keyof T)[],
  ): Promise<T | null> {
    const collectionRef = collection(this.firestore, this.collectionName);
    let q: Query = collectionRef;

    // Apply where conditions
    for (const [key, value] of Object.entries(whereClause)) {
      q = query(q, where(key, '==', value));
    }

    // Limit to a single document
    q = query(q, limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data() as DocumentData;

    // Return only selected columns if specified
    if (columns) {
      const selectedData = {} as T;
      for (const column of columns) {
        if (column in data) {
          selectedData[column] = data[column as keyof DocumentData];
        }
      }
      return selectedData;
    }

    return { id: doc.id, ...data } as T;
  }

  async getList(
    whereClause: IWhereClause,
    columns?: (keyof T)[],
  ): Promise<T[]> {
    const collectionRef = collection(this.firestore, this.collectionName);
    let q: Query = collectionRef;

    // Apply where conditions
    for (const [key, value] of Object.entries(whereClause)) {
      q = query(q, where(key, '==', value));
    }

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;

      // Return only selected columns if specified
      if (columns) {
        const selectedData: T = {} as T;
        for (const column of columns) {
          if (column in data) {
            selectedData[column] = data[column as keyof DocumentData];
          }
        }
        return selectedData;
      }

      return { id: doc.id, ...data } as T;
    });
  }
}
