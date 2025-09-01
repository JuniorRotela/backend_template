import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import { insertData } from "./Insert.services";

export async function insertIntData(tableName: string, data: Record<string, any>): Promise<any> {
 
    const connection = getConnection();
    const { id_quiebre, cod_empresa, id_usuario, id_caballete,  ...objetos } = data;
  
    // console.log("=======================================>xdxdddddd", data);
  
    try {
      // 1. Obtener la última serie de la tabla
      const lastSerieQuery = `SELECT serie FROM ${tableName} WHERE status_active = 1  ORDER BY id DESC LIMIT 1`;
      const lastSerieResult = await connection.query(lastSerieQuery);
      const lastSerie = lastSerieResult.length > 0 ? lastSerieResult[0].serie : "RT0000000";
      
      // 2. Extraer el número de la última serie utilizando una expresión regular
      if (lastSerie) {
        const match = lastSerie.match(/\d+$/); // Extrae solo números al final de la serie
        const lastSerieNumber = match ? parseInt(match[0], 10) : 0;
  
        // 3. Generar nuevas series para cada registro
        const newSeries = Array.from({ length: Object.keys(objetos).length }, (_, i) => 
          `RT${(lastSerieNumber + i + 1).toString().padStart(7, "0")}`
        );
  
        // console.log("🚀 ~ Nuevas series generadas:", newSeries);
  
        const insertedRecords: Array<any> = [];
  
        // Iterar sobre los objetos y agregar id_quiebre a cada uno
        for (let index = 0; index < Object.keys(objetos).length; index++) {
          const key = Object.keys(objetos)[index];
          const obj = objetos[key];
          const datosActualizados: Record<string, any> = {
            ...obj,
            id_quiebre: id_quiebre,
            cod_empresa: cod_empresa,
            id_usuario:  id_usuario,
            serie: newSeries[index],
          };
  
          // Generar la consulta de inserción
          const insertQuery = generateInsertQuery(tableName, datosActualizados);
          
          // Ejecutar la consulta de inserción
          const result = await connection.query(`${insertQuery} RETURNING *`);
          
          if (result && result[0]) {
            insertedRecords.push(result[0]);
          }
          // console.log("intermedio insert", result);
        }
        
        // Retornar todos los registros insertados
        return insertedRecords;
  
      } else {
        console.error("Error: lastSerie es undefined");
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      throw error;
    }
  }
  