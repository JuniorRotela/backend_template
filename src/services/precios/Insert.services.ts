// import { getConnection } from "typeorm";
// import { generateInsertQuery } from "../../genericQueries/insertBuilder";
// // import { format, parseISO } from 'date-fns';
// // import getOneMarcacion from "./getOne.services";

// export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
//   const { id_producto, precios, id_usuario, cod_empresa} = data;

  
//   let datosActualizados: Record<string, any> = {
//     ...data,
//     id_producto: id_producto,
//     precios: precios,
//     id_usuario: id_usuario,
//     cod_empresa: cod_empresa,
 
//   };


//   // Generar la consulta de inserción
//   const insertQuery = generateInsertQuery(tableName, datosActualizados);

//   try {
//     // Obtiene la conexión actual
//     const connection = getConnection();

//     // Ejecuta la consulta SQL y obtiene el resultado de la inserción
//     const result = await connection.query(`${insertQuery} RETURNING *`);
//     const insertedData = result[0];

//     console.log("Data inserted successfully:", insertedData);
//     return insertedData;

//   } catch (error) {
//     console.error("Error inserting data:", error);
//     throw error;
//   }
// }

import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
  const { id_producto, precios, id_usuario, cod_empresa } = data;

  let datosActualizados: Record<string, any> = {
    ...data,
    id_producto: id_producto,
    precios: precios,
    id_usuario: id_usuario,
    cod_empresa: cod_empresa,
  };

  // Generar la consulta de inserción
  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL de inserción
    await connection.query(insertQuery);

    // Ahora obtén el ID del último registro insertado
    const result = await connection.query("SELECT LAST_INSERT_ID() AS id");

    const insertedId = result[0].id;
    console.log("Data inserted successfully with ID:", insertedId);

    return insertedId;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}
