// garden.services.ts
import { getConnection } from "typeorm";
import { generateInsertQuery } from "../genericQueries/insertBuilder";

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
  // Verifica si los campos entrada y salida están presentes en los datos
  const hasEntrada = data.hasOwnProperty('entrada');
  const hasSalida = data.hasOwnProperty('salida');

  // Si están presentes, convierte los timestamps a fechas en el formato deseado
  const formattedEntrada = hasEntrada ? new Date(data.entrada * 1000).toISOString().replace('T', ' ').slice(0, -1) : null;
  const formattedSalida = hasSalida ? new Date(data.salida * 1000).toISOString().replace('T', ' ').slice(0, -1) : null;

  // Crea una copia de los datos con la entrada actualizada si está presente
  const datosActualizados = {
    ...data,
    ...(hasEntrada && { entrada: formattedEntrada }),
    ...(hasSalida && { salida: formattedSalida }),
  };

  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL y obtiene el resultado de la inserción
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    // console.log("Data inserted successfully:", insertedData);

    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}
