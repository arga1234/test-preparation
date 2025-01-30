type Operator = '=' | '!=' | '>' | '<' | '>=' | '<=';

export interface IWhereClause {
  column: string;
  operator: Operator;
  value: string | number | boolean;
}

export interface IPagination {
  limit: number;
  offset: number;
}

export interface IDatabaseClient {
  getList<T>(
    collection: string,
    pagination: IPagination,
    where?: IWhereClause[],
    columns?: (keyof T)[],
  ): Promise<{ data: T[]; total: number }>;
}
