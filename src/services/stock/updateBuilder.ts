// genericQueries/updateBuilder.ts
import { getConnection } from 'typeorm';

export function generateUpdateQuery2(tableName: string, id_notafiscal: any, data: Record<string, any>): string {
  const connection = getConnection();
  const qb = connection.createQueryBuilder().update(tableName).set(data).where('id_notafiscal = :id_notafiscal', { id_notafiscal });

  return qb.getSql();
}