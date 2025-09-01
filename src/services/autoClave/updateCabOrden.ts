// genericQueries/updateBuilder.ts
import { getConnection } from 'typeorm';

export function generateCabOrden(tableName: string, id_caballete: any, data: Record<string, any>): string {
  console.log("🚀 ~ generateCabOrden ~ data:", id_caballete, data)
  const connection = getConnection();
  const qb = connection.createQueryBuilder().update(tableName).set(data).where('id_caballete = :id_caballete and id_autoclave is null', { id_caballete });

  return qb.getSql();
}
