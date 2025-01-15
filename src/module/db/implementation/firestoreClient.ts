import { DBClient, DBResponse } from '../entity';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

export class FirebaseClient implements DBClient {
  private firestore = getFirestore();

  async get<T>(collection: string, id: string): Promise<DBResponse<T | null>> {
    try {
      const documentRef = doc(this.firestore, collection, id);
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        return { success: true, data: documentSnapshot.data() as T };
      } else {
        return { success: true, data: null }; // No data found, but operation is successful
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch document',
      };
    }
  }

  async set<T>(
    collection: string,
    id: string,
    data: T,
  ): Promise<DBResponse<void>> {
    try {
      const documentRef = doc(this.firestore, collection, id);
      await setDoc(documentRef, data as { [x: string]: any });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to set document',
      };
    }
  }

  async update<T>(
    collection: string,
    id: string,
    data: Partial<T>,
  ): Promise<DBResponse<void>> {
    try {
      const documentRef = doc(this.firestore, collection, id);
      await updateDoc(documentRef, data);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to update document',
      };
    }
  }

  async delete(collection: string, id: string): Promise<DBResponse<void>> {
    try {
      const documentRef = doc(this.firestore, collection, id);
      await deleteDoc(documentRef);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to delete document',
      };
    }
  }
}
