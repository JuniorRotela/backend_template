// genericQueries/updateBuilder.ts
import { getConnection } from 'typeorm';

export function generateUpdateBajarStock(tableName: string, cod_interno: any, data: Record<string, any>): string {
  const connection = getConnection();
  const qb = connection.createQueryBuilder().update(tableName).set(data).where('cod_interno = :cod_interno and status_active !=0', { cod_interno });

  return qb.getSql();
}
