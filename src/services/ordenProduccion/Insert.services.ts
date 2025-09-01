
// import { getConnection } from "typeorm";
// import { generateInsertQuery } from "../../genericQueries/insertBuilder";

// export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
//   const { orden, id_producto, cantidad} = data;

//   try {
//     // Obtiene la conexión actual
//     const connection = getConnection();

//     // 1. Obtener la última serie de la tabla
//     const lastSerieQuery = `SELECT serie FROM ${tableName} WHERE status_active = 1  ORDER BY id DESC LIMIT 1 `;
//     const lastSerieResult = await connection.query(lastSerieQuery);
//     const lastSerie = lastSerieResult.length > 0 ? lastSerieResult[0].serie : "SERIE-0000";

//     console.log("🚀 ~ Última serie encontrada:", lastSerie);

//     // 2. Generar nuevas series
//     const lastSerieNumber = parseInt(lastSerie.split("DRA")[1]) || 0;
//     const newSeries = Array.from({ length: cantidad }, (_, i) => 
//       `DRA-${(lastSerieNumber + i + 1).toString().padStart(6, "0")}`
//     );

//     console.log("🚀 ~ Nuevas series generadas:", newSeries);

//     // 3. Insertar registros secuencialmente
//     const insertedData = [];
//     for (const serie of newSeries) {
//       const datosActualizados: Record<string, any> = {
//         orden,
//         id_producto,
//         serie,
//         cantidad: 1, // Cantidad fija en cada registro
//         // id_proveedor,
//       };

//       // Generar la consulta de inserción
//       const insertQuery = generateInsertQuery(tableName, datosActualizados);

//       console.log("🚀 ~ Consulta generada para inserción:", insertQuery);

//       // Ejecutar la consulta SQL
//       const result = await connection.query(`${insertQuery} RETURNING *`);
//       insertedData.push(result[0]); // Agregar el registro insertado al array
//     }

//     console.log("🚀 ~ Datos insertados exitosamente:", insertedData);
//     return insertedData;

//   } catch (error) {
//     console.error("Error inserting data:", error);
//     throw error;
//   }
// }

import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
  const { orden, id_producto, cantidad } = data;
  
  try {
    const connection = getConnection();

    // 1. Obtener la última serie de la tabla
    const lastSerieQuery = `SELECT serie FROM ${tableName} WHERE status_active = 1 ORDER BY id DESC LIMIT 1`;
    const lastSerieResult = await connection.query(lastSerieQuery);
    const lastSerie = lastSerieResult.length > 0 ? lastSerieResult[0].serie : "DRA000000";

    console.log("🚀 ~ Última serie encontrada:", lastSerie);

    // 2. Extraer el número de la última serie utilizando una expresión regular
    const match = lastSerie.match(/\d+$/); // Extrae solo números al final de la serie
    const lastSerieNumber = match ? parseInt(match[0], 10) : 0;

    console.log("🚀 ~ Número de última serie:", lastSerieNumber);

    // 3. Generar nuevas series
    const newSeries = Array.from({ length: cantidad }, (_, i) => 
      `DRA${(lastSerieNumber + i + 1).toString().padStart(6, "0")}`
    );

    console.log("🚀 ~ Nuevas series generadas:", newSeries);

    // 4. Insertar registros secuencialmente
    const insertedData = [];
    for (const serie of newSeries) {
      const datosActualizados: Record<string, any> = {
        orden,
        id_producto,
        serie,
        cantidad: 1, // Cantidad fija en cada registro
      };

      const insertQuery = generateInsertQuery(tableName, datosActualizados);

      console.log("🚀 ~ Consulta generada para inserción:", insertQuery);

      const result = await connection.query(`${insertQuery} RETURNING *`);
      insertedData.push(result[0]); // Agregar el registro insertado al array
    }

    console.log("🚀 ~ Datos insertados exitosamente:", insertedData);
    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}
