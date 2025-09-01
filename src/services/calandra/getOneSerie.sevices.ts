import { getConnection } from "typeorm";

export const getOneSerieData = async (tableName: string, serie:string): Promise<any | null> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL para obtener el último registro con id_produccion > 0
    const result = await connection.query(
      `
      SELECT * FROM ${tableName} 
      WHERE status_active = 1 AND serie = ? AND DATE(create_at) = CURDATE()
      ORDER BY id_produccion DESC
      `,
      [serie]
    );
    
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
