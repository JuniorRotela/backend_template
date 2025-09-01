// import { getConnection } from "typeorm";
// import { generateInsertQuery } from "../../genericQueries/insertBuilder";
// import { updateData } from "../grupos/update.services";
// import  getOneDta  from "./getOneSerie.services"

// export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
//   const { cod, descripcion, motivo, medidas, id_caballete,defecto, obs, serie, turno, id_clasificacion, id_producto, id_horarios, id_motivo, id_usuario, id_produccion} = data;

//   // Crear el objeto con los datos actualizados y formateados
//   let datosActualizados: Record<string, any> = {
//     cod: cod,
//     descripcion: descripcion,
//     medidas: medidas,
//     id_caballete: id_caballete,
//     defecto: defecto,
//     obs: obs,
//     serie: serie,
//     id_clasificacion: id_clasificacion,
//     id_producto: id_producto,
//     motivo: motivo,
//     id_usuario: id_usuario,
//     turno:turno,
//     id_produccion: id_produccion,

//     ...data
//   };
  
//   const serieValidate = await getOneDta("interfoliacion", serie);
//   if(serieValidate != null){
//     throw new Error("Ya Existe un Registro Con esta serie");
//   }

//   if (serie.length > 10) {
//     throw new Error("La serie no puede tener más de 10 caracteres");
//   }
  
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
import { updateData } from "../grupos/update.services";
import getOneDta from "./getOneSerie.services";
import { updateDataCabOrder } from "./updateCaballeteOrden.services";

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
  const {
    cod,
    descripcion,
    motivo,
    medidas,
    id_caballete,
    defecto,
    obs,
    serie,
    turno,
    id_clasificacion,
    id_producto,
    id_horarios,
    id_motivo,
    id_usuario,
    id_produccion,
  } = data;

  // Crear el objeto con los datos actualizados y formateados
  let datosActualizados: Record<string, any> = {
    cod,
    descripcion,
    medidas,
    id_caballete,
    defecto,
    obs,
    serie,
    id_clasificacion,
    id_producto,
    motivo,
    id_usuario,
    turno,
    id_produccion,
    ...data,
  };

  // Validar si la serie ya existe en la tabla
  const serieValidate = await getOneDta("interfoliacion", serie);
  if (serieValidate != null) {
    throw new Error("Ya existe un registro con esta serie");
  }

  // Validar si la longitud de la serie es mayor a 10 caracteres
  if (serie.length > 10) {
    throw new Error("La serie no puede tener más de 10 caracteres");
  }

  // Generar la consulta de inserción
  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {
    // Obtener la conexión actual
    const connection = getConnection();

    // Ejecutar la consulta SQL y obtener el resultado de la inserción
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    console.log("Data inserted successfully:", insertedData);


    const dataOrder = {
      serie: String(insertedData.serie),
      id_caballete: 163,
      // orden: insertedData.orden
    }
    const updateDataCab = await updateDataCabOrder("orden_produccion", dataOrder )

    return insertedData;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}
