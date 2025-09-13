// genericQueries/updateBuilder.ts
import { getConnection } from 'typeorm';

export function generateUpdateOr(tableName: string, id: any, data: Record<string, any>): string {
  const connection = getConnection();
  const qb = connection.createQueryBuilder().update(tableName).set(data).where('pedido = :id', { id });

  return qb.getSql();
}
