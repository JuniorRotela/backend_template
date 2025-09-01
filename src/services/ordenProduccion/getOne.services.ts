import { getConnection } from "typeorm";

 const getOneOrden = async (tableName: string, id: number): Promise<any | null> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL para obtener un único registro por ID
    const result = await connection.query(`SELECT orden FROM ${tableName} WHERE status_active = 1 ORDER BY id DESC LIMIT 1`);

    console.log("resultado",result)
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
export default getOneOrden
;