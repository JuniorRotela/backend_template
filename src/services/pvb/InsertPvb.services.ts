
import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";

export async function insertDataPvb(tableName: string, data: Record<string, any>[]): Promise<any> {
  try {
    // Obtener la conexión actual
    const connection = getConnection();

    // 1. Obtener la última serie de la tabla
    const lastSerieQuery = `SELECT cod_interno FROM ${tableName} WHERE status_active != 0 ORDER BY id DESC LIMIT 1`;
    const lastSerieResult = await connection.query(lastSerieQuery);
    const lastSerie = lastSerieResult.length > 0 ? lastSerieResult[0].cod_interno : "PVB0000000";

    console.log("🚀 ~ Última serie encontrada:", lastSerie);

    // 2. Extraer el número de la última serie utilizando una expresión regular
    const match = lastSerie.match(/\d+$/); // Extrae solo números al final de la serie
    const lastSerieNumber = match ? parseInt(match[0], 10) : 0;

    console.log("🚀 ~ Número de última serie:", lastSerieNumber);

    // 3. Generar nuevas series para cada registro
    const newSeries = Array.from({ length: data.length }, (_, i) => 
      `PVB${(lastSerieNumber + i + 1).toString().padStart(7, "0")}`
    );

    console.log("🚀 ~ Nuevas series generadas:", newSeries);

    // Iterar sobre cada objeto en el arreglo
    const insertedDataArray = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const { id_producto, alto, largo, espesura, serie,  obs, id_proveedor, id_usuario, id_notafiscal, cod_empresa } = item;

      // Crear el objeto con los datos actualizados y formateados
      const datosActualizados: Record<string, any> = {
        id_producto,
        cod_empresa,
        id_usuario,
        alto,
        largo,
        espesura,
        obs,
        serie,
        id_proveedor,
        cod_interno: newSeries[i],
        id_notafiscal,
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
