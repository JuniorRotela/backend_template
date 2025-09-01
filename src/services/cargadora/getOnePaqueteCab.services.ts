import { getConnection } from "typeorm";

export const getOneDataPackCab = async (tableName: string, id: number): Promise<any | null> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();

   // Ejecuta la consulta SQL para obtener el último registro
   const result = await connection.query(`SELECT cod_interno FROM ${tableName} WHERE status_active = 1 
    and id_caballete = ${id} ORDER BY update_at DESC LIMIT 1`);

    // Verifica si se encontró un registro
    if (result && result.length > 0) {
      return result[0];
    } else {
      return null; // Devuelve null si no se encuentra ningún registro
    }
  } catch (error) {
    console.error("Error getting  data:", error);
    throw error;
  }
};