

import { getConnection } from "typeorm";

/**
 * Obtiene todos los registros de una tabla específica que coincidan con el valor de `orden` y estén activos.
 * @param tableName - Nombre de la tabla.
 * @param cod - Valor del campo `orden` por el cual filtrar.
 * @returns Un arreglo con los registros encontrados.
 */
export const getVerificarStock = async (tableName: string, cod: string): Promise<any[]> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();
    const result = await connection.query(
      `     
      SELECT id, cod, cantidad, cantidad_entrada, reservado 
      FROM ${tableName}
      WHERE cod = (
          SELECT CONCAT(
              CASE
                  WHEN RIGHT(SUBSTRING_INDEX(cod, '+', 1), 1) REGEXP '[0-9]' THEN 
                      CONCAT(SUBSTRING_INDEX(cod, '+', 1), '-')
                  ELSE
                      SUBSTRING_INDEX(cod, '+', 1)
              END, 
              SUBSTRING_INDEX(REGEXP_SUBSTR(SUBSTRING_INDEX(cod, '+', -1), '[0-9]+'), '1', 1), 
              'mm',
              SUBSTRING_INDEX(SUBSTRING_INDEX(cod, ' ', -2), '-', 1)
          )
          FROM rrhh.productos p
          WHERE cod = ?
          limit 1
      )
      OR cod = (
          SELECT CONCAT(
              LEFT(SUBSTRING_INDEX(cod, '+', 1), 1), 
              '-',
              REGEXP_SUBSTR(SUBSTRING_INDEX(cod, '+', -1), '^[A-Za-z]+'),
              SUBSTRING_INDEX(SUBSTRING_INDEX(REGEXP_SUBSTR(SUBSTRING_INDEX(cod, '+', -1), '[0-9]+'), '1', -1), ' ', 1),
              'mm',
              SUBSTRING_INDEX(SUBSTRING_INDEX(cod, ' ', -2), '-', 1)
          )
          FROM rrhh.productos p
          WHERE cod = ?
          limit 1
      )
      `,
      [cod, cod] // Pasa el parámetro dos veces para las dos subconsultas
    );    

    // Retorna todos los registros encontrados
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error; // Lanza el error para que el llamador lo maneje
  }
};
