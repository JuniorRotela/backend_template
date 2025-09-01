
import { getConnection } from "typeorm";

/**
 * Obtiene todos los registros de una tabla específica que coincidan con el valor de `orden` y estén activos.
 * @param tableName - Nombre de la tabla.
 * @param orden - Valor del campo `orden` por el cual filtrar.
 * @returns Un arreglo con los registros encontrados.
 */
export const getOrdenSeries = async (tableName: string, orden: number): Promise<any[]> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL para obtener todos los registros por `orden` con el filtro `status_active = 1`
    const result = await connection.query(
      `SELECT * FROM ${tableName} WHERE status_active = 1 AND orden = ?`,
      [orden]
    );

    // Retorna todos los registros encontrados
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error; // Lanza el error para que el llamador lo maneje
  }
};
