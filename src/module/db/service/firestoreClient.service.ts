import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  startAfter,
  getDocs,
  WhereFilterOp,
} from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';
import { IDatabaseClient, IPagination, IWhereClause } from '../repository';

class FirestoreClient implements IDatabaseClient {
  private db: Firestore;

  constructor() {
    this.db = getFirestore();
  }

  async getList<T>(
    collectionName: string,
    pagination: IPagination,
    whereClauses?: IWhereClause[],
    columns?: (keyof T)[],
  ): Promise<{ data: T[]; total: number }> {
    const colRef = collection(this.db, collectionName);
    let q = query(colRef);

    // Apply where clauses if provided
    if (whereClauses) {
      whereClauses.forEach((clause) => {
        q = query(
          q,
          where(clause.column, clause.operator as WhereFilterOp, clause.value),
        );
      });
    }

    // Get total count
    const totalSnapshot = await getDocs(q);
    const total = totalSnapshot.size;

    // Apply pagination
    q = query(q, limit(pagination.limit));
    if (pagination.offset > 0) {
      const offsetSnapshot = await getDocs(q);
      const lastVisible = offsetSnapshot.docs[pagination.offset - 1];
      if (lastVisible) {
        q = query(q, startAfter(lastVisible));
      }
    }

    // Fetch data
    const snapshot = await getDocs(q);
    const data: T[] = snapshot.docs.map((doc) => {
      const docData = doc.data() as T;
      if (columns) {
        return columns.reduce((acc, key) => {
          acc[key] = docData[key];
          return acc;
        }, {} as T);
      }
      return docData;
    });

    return { data, total };
  }
}

export default FirestoreClient;
