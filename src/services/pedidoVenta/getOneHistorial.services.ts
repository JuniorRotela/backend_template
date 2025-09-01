import { getConnection } from "typeorm";

export const getOneCamionChapaHistorial = async (tableName: string, chapa: string): Promise<any | null> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL para obtener un único registro por chapa
    const result = await connection.query(
      `SELECT * FROM ${tableName} WHERE  n_pedido = ? ORDER BY id DESC;`,
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

export default getOneCamionChapaHistorial;
