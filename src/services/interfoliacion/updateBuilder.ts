// import { getConnection } from 'typeorm';

// export function generateUpdateQuery(tableName: string, data: Record<string, any>): string {
//   console.log("XSASDFASDF",data)
//   const connection = getConnection();
//   const colarS = null;
//   const qb = connection.createQueryBuilder().update(tableName).set(data).where(`colar = '${colarS}' AND id_clasificacion = 1`);

//   return qb.getSql();
// }
import { getConnection } from 'typeorm';

export function generateUpdateQuery(tableName: string, data: Record<string, any>): string {
  // console.log("XSASDFASDF", data);
  const connection = getConnection();
  const qb = connection.createQueryBuilder()
    .update(tableName)
    .set(data)
    .where('colar IS NULL AND id_clasificacion = 1 and status_active != 0');

  return qb.getSql();
}
