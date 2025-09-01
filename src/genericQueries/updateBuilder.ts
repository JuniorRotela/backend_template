// genericQueries/updateBuilder.ts
import { getConnection } from 'typeorm';

export function generateUpdateQuery(tableName: string, id: any, data: Record<string, any>): string {
  const connection = getConnection();
  const qb = connection.createQueryBuilder().update(tableName).set(data).where('id = :id', { id });

  return qb.getSql();
}
