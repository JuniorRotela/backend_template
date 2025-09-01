import { getConnection } from "typeorm";

 const getUserId= async (tableName: string, id: number): Promise<any | null> => {
  tableName = "user"
  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL para obtener un único registro por ID
    const result = await connection.query(`SELECT * FROM ${tableName} WHERE status_active = 1 and id_empleado = ${id}`, [id]);

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
export default getUserId;