import { getManager } from 'typeorm';

// export const getDataF = async (tableName: string): Promise<any[]> => {
//   try {
//     const entityManager = getManager();
//     const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active = 1 and descripcion LIKE '%VIDRO MONOLI%' `);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

export const getDataF = async (tableName: string, codigo?: number): Promise<any[]> => {
  try {
    const entityManager = getManager();

    // Construye la consulta base
    let query = `SELECT * FROM ${tableName}`; // Asegúrate de filtrar registros activos

    // Agrega condiciones basadas en los parámetros recibidos
    if (codigo === 0) {
      query += ` where status_active = 1 AND descripcion LIKE "%VIDRO MONOLI%"`; // Condición específica para codigo 0
    }
    
    if (codigo === 1) {
      query += ` where status_active = 1 and descripcion LIKE "%VIDRO LAMINA%"`; // Condición específica para codigo 1
    }

    const result = await entityManager.query(query);
    return result;
  } catch (error) {
    throw error;
  }
};