// genericQueries/updateBuilder.ts
import { getConnection } from 'typeorm';

export function descuentoStock(tableName: string, serie: any, data: Record<string, any>): string {
  console.log("🚀 ~ descuentoStock ~ data:", data)
  console.log("🚀 ~ descuentoStock ~ serie:", serie)
  const connection = getConnection();
  const qb = connection.createQueryBuilder().update(tableName).set(data).where('serie = :serie', { serie });

  return qb.getSql();
}