export interface DBResponse<T> {
  success: boolean; // Menunjukkan apakah operasi berhasil
  data?: T; // Data hasil operasi, jika ada
  error?: string; // Pesan kesalahan, jika operasi gagal
}

export interface DBClient {
  get<T>(collection: string, id: string): Promise<DBResponse<T | null>>;
  set<T>(collection: string, id: string, data: T): Promise<DBResponse<void>>;
  update<T>(
    collection: string,
    id: string,
    data: Partial<T>,
  ): Promise<DBResponse<void>>;
  delete(collection: string, id: string): Promise<DBResponse<void>>;
}
