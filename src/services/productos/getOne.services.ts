import { getConnection } from "typeorm";

export const getProveedorProduct = async (
  tableName: string,
  id: number,
  id_categoria: number
): Promise<any[] | null> => {
  try {
    const connection = getConnection();

    const result = await connection.query(
      `SELECT * FROM ${tableName} WHERE status_active = 1 AND id_categoria = ? AND id_proveedor = ?`,
      [id_categoria, id]
    );

    return result.length > 0 ? result : null;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
