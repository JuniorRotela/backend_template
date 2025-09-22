// import { getConnection } from "typeorm";

// export const getOneOrdenx = async (tableName: string, id: number): Promise<any | null> => {
//   try {
//     // Obtiene la conexión actual
//     const connection = getConnection();

//     // Ejecuta la consulta SQL para obtener un único registro por ID
//     const result = await connection.query(`SELECT * FROM ${tableName} WHERE pedido = ${id}`, [id]);

//     // Verifica si se encontró un registro
//     if (result && result.length > 0) {
//       return result[0];
//     } else {
//       return null; // Devuelve null si no se encuentra ningún registro
//     }
//   } catch (error) {
//     console.error("Error getting  data:", error);
//     throw error;
//   }
// };


import { AppDataSource } from "../../db";

export const getOneOrdenx = async (tableName: string, id: number): Promise<any | null> => {
  try {
    // Usar parámetros para evitar SQL injection
    const result = await AppDataSource.query(
      `SELECT * FROM ${tableName} WHERE pedido = ?`,
      [id]
    );

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
