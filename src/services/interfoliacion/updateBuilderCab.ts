// import { getConnection } from 'typeorm';

// export function generateUpdateQuery(tableName: string, data: Record<string, any>): string {
//   console.log("XSASDFASDF",data)
//   const connection = getConnection();
//   const colarS = null;
//   const qb = connection.createQueryBuilder().update(tableName).set(data).where(`colar = '${colarS}' AND id_clasificacion = 1`);

//   return qb.getSql();
// }
import { getConnection } from 'typeorm';

export function generateUpdateCab(tableName: string, data: Record<string, any>): string {

  const { serie } = data; // Desestructuramos para obtener la serie
  const serieStr = String(serie);
  
  const connection = getConnection();

  console.log("XSASDFASDF", data); // Debugging para ver los valores que llegan

  const qb = connection.createQueryBuilder()
    .update(tableName)
    .set(data) // 🔹 Aquí se está pasando el nuevo valor del caballete
    .where(`serie = "${serieStr}" AND status_active = 1`); // Parámetros seguros

  return qb.getSql(); // Devuelve la consulta generada
}