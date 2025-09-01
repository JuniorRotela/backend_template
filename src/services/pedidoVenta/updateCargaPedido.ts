// genericQueries/updateBuilder.ts
import { getConnection } from 'typeorm';

export function generateUpdateQuery(tableName: string, id: any, data: Record<string, any>): string {
  const connection = getConnection();
  const qb = connection.createQueryBuilder().update(tableName).set(data).where('status_active >= 1 and id_vehiculo = :id' , { id });

  return qb.getSql();
}
