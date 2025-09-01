import { getConnection } from "typeorm";

export const getOneCamionChapa = async (tableName: string, chapa: string): Promise<any | null> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL para obtener un único registro por chapa
    const result = await connection.query(
      `SELECT * FROM ${tableName} WHERE status_active > 0 AND chapa = ? ORDER BY id DESC;`,
      [chapa]
    );

    console.log("resultado", result);

    // Verifica si se encontró un registro
    return result.length > 0 ? result : null;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

export default getOneCamionChapa;
