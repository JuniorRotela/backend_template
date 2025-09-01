import { getConnection } from "typeorm";

export const getUserByUsername = async (tableName: string, username: string): Promise<any | null> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL para obtener el registro del usuario por nombre de usuario
    const result = await connection.query(`SELECT * FROM ${tableName} WHERE status_active = 1 AND firstname = $1`, [username]);

    // Verifica si se encontró un registro
    if (result && result.length > 0) {
      return result[0];
    } else {
      return null; // Devuelve null si no se encuentra ningún registro
    }
  } catch (error) {
    console.error("Error getting user by username:", error);
    throw error;
  }
};
