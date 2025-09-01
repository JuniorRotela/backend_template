import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import { format } from 'date-fns';

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
  const { id_problemacalandra, entroproblema, obs, serie, producto, imagenes, id_usuario} = data;

  // Convertir entrada y salida de timestamp a formato legible
  // let formattedEntrada = format(new Date(entrada * 1000), 'yyyy-MM-dd HH:mm:ss'); // Multiplicar por 1000 para convertir de segundos a milisegundos
  // let formattedSalida = format(new Date(salida * 1000), 'yyyy-MM-dd HH:mm:ss');

  // Crear el objeto con los datos actualizados y formateados
  let datosActualizados: Record<string, any> = {
    id_problemacalandra: id_problemacalandra,
    entroproblema: entroproblema,
    obs: obs,
    serie: serie,
    producto: producto,
    imagenes: imagenes,
    id_usuario: id_usuario,
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