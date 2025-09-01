import { getConnection } from "typeorm";

export const getOneIdData = async (tableName: string): Promise<any | null> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL para obtener el último registro con id_produccion > 0
    const result = await connection.query(`
      SELECT id_produccion FROM ${tableName} 
      WHERE status_active = 1 AND id_produccion > 0 
      ORDER BY id_produccion DESC 
      LIMIT 1
    `);

    // Verifica si se encontró un registro
    if (result && result.length > 0) {
      return result[0];
    } else {
      return null; // Devuelve null si no se encuentra ningún registro
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
