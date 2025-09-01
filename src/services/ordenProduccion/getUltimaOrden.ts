// import { getManager } from 'typeorm';

// export const getUltimaOrden = async (tableName: string): Promise<any[]> => {
//   try {
//     const entityManager = getManager();
//     const result = await entityManager.query(`SELECT orden FROM ${tableName} WHERE status_active = 1  ORDER BY id DESC LIMIT 1`);
    
    
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }
// export default getUltimaOrden;

import { getManager } from 'typeorm';

export const getUltimaOrden = async (tableName: string): Promise<number> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT orden FROM ${tableName} WHERE status_active = 1 ORDER BY id DESC LIMIT 1`);
    
    if (result.length === 0) {
      return 1; // Si no hay resultados, retorna 1
    }

    return result[0]; // Retorna la orden del primer resultado
  } catch (error) {
    throw error;
  }
}

export default getUltimaOrden;