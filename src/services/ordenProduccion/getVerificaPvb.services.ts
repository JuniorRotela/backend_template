

import { getConnection } from "typeorm";

/**
 * Obtiene todos los registros de una tabla específica que coincidan con el valor de `orden` y estén activos.
 * @param tableName - Nombre de la tabla.
 * @param cod - Valor del campo `orden` por el cual filtrar.
 * @returns Un arreglo con los registros encontrados.
 */
export const getVerificarPvb = async (tableName: string, cod: string): Promise<any[]> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();
    const result = await connection.query(
      `     
      SELECT 
          TRIM(SUBSTRING_INDEX(cod, '-', -1)) AS pvb, id
      FROM 
          ${tableName}
      WHERE 
          cod = ?
      limit 1;
      `,
      [cod] // Pasa el parámetro dos veces para las dos subconsultas
    );    


    // Retorna todos los registros encontrados
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error; // Lanza el error para que el llamador lo maneje
  }
};
