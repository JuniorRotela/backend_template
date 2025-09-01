// import { getConnection } from "typeorm";
// import { generateInsertQuery } from "../../genericQueries/insertBuilder";
// import { format } from 'date-fns';

// export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
//   const { estado, primerCaballete, segundoCaballete, recetaUtilizada, tempAguaCaja1, tempAguaCaja2, tempAguaCaja3, tempInterna, tempExterna } = data;

//   // Crear el objeto con los datos actualizados y formateados
//   let datosActualizados: Record<string, any> = {
//     estado: estado,
//     primerCaballete: primerCaballete,
//     segundoCaballete: segundoCaballete || 163,
//     recetaUtilizada: recetaUtilizada,
//     tempAguaCaja1: tempAguaCaja1,
//     tempAguaCaja2: tempAguaCaja2,
//     tempAguaCaja3: tempAguaCaja3,
//     tempInterna: tempInterna,
//     tempExterna: tempExterna
//   };

//   // Generar la consulta de inserción
//   const insertQuery = generateInsertQuery(tableName, datosActualizados);

//   try {
//     // Obtener la conexión actual
//     const connection = getConnection();

//     // Ejecutar la consulta SQL y obtener el resultado de la inserción
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
import {monitorFileData} from "../autoClave/getAutoClave.services";
import { format } from 'date-fns';

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
  const { estado, primerCaballete, segundoCaballete, recetaUtilizada, tempAguaCaja1, tempAguaCaja2, tempAguaCaja3, tempInterna, tempExterna } = data;

  // Crear el objeto con los datos actualizados y formateados
  let datosActualizados: Record<string, any> = {
    estado: estado,
    primerCaballete: primerCaballete,
    segundoCaballete: segundoCaballete || 163,
    recetaUtilizada: recetaUtilizada,
    tempAguaCaja1: tempAguaCaja1,
    tempAguaCaja2: tempAguaCaja2,
    tempAguaCaja3: tempAguaCaja3,
    tempInterna: tempInterna,
    tempExterna: tempExterna
  };

  // Generar la consulta de inserción
  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {
    // Obtener la conexión actual
    const connection = getConnection();

    // Ejecutar la consulta SQL y obtener el resultado de la inserción
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    // console.log("Data inserted successfully:", insertedData);

    if (insertedData) {
      setImmediate(() => {
        try {
          monitorFileData();
        } catch (error) {
          console.error("Error in background process:", error);
        }
      });
    }
    
    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}