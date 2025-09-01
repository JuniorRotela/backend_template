import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
// import { format, parseISO } from 'date-fns';
// import getOneMarcacion from "./getOne.services";

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
  const { cod, descripcion, id_categoria, medidas} = data;

  
  let datosActualizados: Record<string, any> = {
    ...data,
   cod: cod,
   descripcion: descripcion,
   id_categoria: id_categoria,
   medidas: medidas,
  };


  // Generar la consulta de inserción
  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL y obtiene el resultado de la inserción
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    console.log("Data inserted successfully:", insertedData);
    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}