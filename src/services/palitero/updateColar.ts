// import { getConnection } from 'typeorm';

// export function generateUpdateQuery(tableName: string, data: Record<string, any>): string {
//   console.log("XSASDFASDF",data)
//   const connection = getConnection();
//   const colarS = null;
//   const qb = connection.createQueryBuilder().update(tableName).set(data).where(`colar = '${colarS}' AND id_clasificacion = 1`);

//   return qb.getSql();
// }
import { getConnection } from 'typeorm';

export function generateUpdateQueryColarP(id: number, tableName: string) : string {
  // console.log("XSASDFASDF", data);
  const connection = getConnection();

  const qb = connection.createQueryBuilder()
    .update(tableName)
    .set({ colar: null })
    .where(`id_caballete = :id`, { id });

  return qb.getSql();
}