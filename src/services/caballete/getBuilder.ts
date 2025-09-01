// import { getManager } from 'typeorm';

// export const getData = async (tableName: string): Promise<any[]> => {
//   try {
//     const entityManager = getManager();
//     const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active = 1 and codigo LIKE "AC.CV%" `);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

import { getManager } from 'typeorm';

export const getData = async (tableName: string,  codigo?: number): Promise<any[]> => {
  try {
    const entityManager = getManager();

    // Construye la consulta base
    let query = `SELECT * FROM ${tableName}`; // Asegúrate de filtrar registros activos

    // Agrega condiciones basadas en los parámetros recibidos
    if (codigo === 0) {
      query += ` where status_active = 1 AND codigo LIKE "AC.CV%" and estado LIKE "%Liberado%"`; // Condición específica para codigo 0
    }
    
    if (codigo === 1) {
      query += ` where status_active = 1 and estado LIKE "%Liberado%"`; // Condición específica para codigo 1
    }

    if (codigo === 2) {
      query += ` where status_active = 1`; // Condición específica para codigo 2
    }

    if (codigo === 3) {
      query += ` where status_active = 1 AND codigo LIKE "AC.CV%" and estado LIKE "%Entrada"`; // Condición específica para codigo 3
    } 

    const result = await entityManager.query(query);
    return result;
  } catch (error) {
    throw error;
  }
};

