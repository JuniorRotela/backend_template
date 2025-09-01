import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";


export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
  const { descripcion, id_grupo, meta, motivo } = data;

  // Crear el objeto con los datos actualizados y formateados
  let datosActualizados: Record<string, any> = {
    id_grupo: id_grupo,
    descripcion: descripcion,
    // motivo: motivo,
    meta: meta,
    ...data
  };

  // Generar la consulta de inserción
  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {
    // Obtener la conexión actual
    const connection = getConnection();

    // Ejecutar la consulta SQL y obtener el resultado de la inserción
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    console.log("Data inserted successfully:", insertedData);
    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}