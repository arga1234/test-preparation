export interface IWhereClause {
  [key: string]: string | number | boolean;
}

export interface IDatabaseClient<T> {
  getSingle(where: IWhereClause, columns?: (keyof T)[]): Promise<T | null>;
  getList(where: IWhereClause, columns?: (keyof T)[]): Promise<T[]>;
}
