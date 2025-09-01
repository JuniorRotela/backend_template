// genericQueries/updateBuilder.ts
import { getConnection } from 'typeorm';

export function generateUpdateQuery(tableName: string, orden: any, data: Record<string, any>): string {
  const connection = getConnection();
  const qb = connection.createQueryBuilder().update(tableName).set(data).where('orden = :orden', { orden });

  return qb.getSql();
}
