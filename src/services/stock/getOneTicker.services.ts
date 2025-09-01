import { getConnection } from "typeorm";

export const getOneTicketData = async (tableName: string, id_produccion: number): Promise<any | null> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL para eliminar "VIDRO LAMINADO" y extraer el texto antes de las medidas
    const result = await connection.query(`
      SELECT *, 
        TRIM(
          REPLACE(
            SUBSTRING(descripcion, 1, LOCATE('3', descripcion) - 1),
            'VIDRO LAMINADO',
            ''
          )
        ) AS descripcion
      FROM ${tableName} 
      WHERE status_active = 1 AND id = ${id_produccion}
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