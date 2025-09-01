

import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";

export async function insertReseta(tableName: string, data: Record<string, any>[]): Promise<any> {
  try {
    // Obtener la conexión actual
    const connection = getConnection();

    // Iterar sobre cada objeto en el arreglo
    const insertedDataArray = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const { fase, presion, temperatura, tiempo, id_receta, id_usuario, cod_empresa } = item;

      // Crear el objeto con los datos actualizados y formateados
      const datosActualizados: Record<string, any> = {
        fase,
        presion,
        temperatura,
        tiempo,
        id_receta,
        cod_empresa,
        id_usuario,
      };

      // Generar la consulta de inserción
      const insertQuery = generateInsertQuery(tableName, datosActualizados);

      // Ejecutar la consulta SQL y obtener el resultado de la inserción
      const result = await connection.query(`${insertQuery} RETURNING *`);
      const insertedData = result[0];
      insertedDataArray.push(insertedData);
    }

    console.log("All data inserted successfully:", insertedDataArray);
    return insertedDataArray;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}
