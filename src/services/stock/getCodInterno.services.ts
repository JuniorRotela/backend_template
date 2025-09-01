import { getConnection } from "typeorm";

 const getOne= async (tableName: string, serie: string): Promise<any | null> => {
  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL para obtener un único registro por ID
    const result = await connection.query(`SELECT * FROM ${tableName} WHERE status_active !=0 and cod_interno = '${serie}' ORDER BY create_at DESC 
LIMIT 1;`, [serie]);

    // console.log("resultado",result)
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

export default getOne;