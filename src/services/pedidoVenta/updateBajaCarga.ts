// genericQueries/updateBuilder.ts
import { getConnection } from 'typeorm';

export function generateUpdateBajarCarga(tableName: string, serie: any, data: Record<string, any>): string {
  const connection = getConnection();
  const qb = connection.createQueryBuilder().update(tableName).set(data).where('serie = :serie and status_active !=0', { serie });

  return qb.getSql();
}
