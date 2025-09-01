import { getConnection } from "typeorm";

const getOnePaquete = async (tableName: string, serie: string): Promise<any | null> => {
  try {
    // Valida el nombre de la tabla para evitar inyección SQL
    const validTables = ["stock"]; // Agrega las tablas válidas aquí
    if (!validTables.includes(tableName)) {
      throw new Error(`Invalid table name: ${tableName}`);
    }

    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL de forma segura usando parámetros
    const query = `
      SELECT *
      FROM ${tableName} 
      WHERE status_active = 1 AND cod_interno = ? 
      LIMIT 1;
    `;
    const result = await connection.query(query, [serie]);

    // console.log("Resultado:", result);

    // Verifica si se encontró un registro
    if (result && result.length > 0) {
      return result[0];
    } else {
      return null; // Devuelve null si no se encuentra ningún registro
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export default getOnePaquete;
