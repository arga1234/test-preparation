interface IWhereClause {
  [key: string]: string | number | boolean;
}

export interface IDatabaseClient<T> {
  getSingle(where: IWhereClause): Promise<T | null>;
  getList(where: IWhereClause): Promise<T[]>;
}
