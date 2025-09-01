import { getConnection } from "typeorm";

export const getVerifyStock = async (tableName: string, numeroNota: number): Promise<any | null> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL para obtener un único registro por ID
    const result = await connection.query(`SELECT * FROM ${tableName} WHERE status_active !=0 and id_notafiscal = ${numeroNota}`, [numeroNota]);

    // Verifica si se encontró un registro
    if (result && result.length > 0) {
      return result;
    } else {
      return null; // Devuelve null si no se encuentra ningún registro
    }
  } catch (error) {
    console.error("Error getting  data:", error);
    throw error;
  }
};