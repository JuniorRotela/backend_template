import { getManager } from 'typeorm';

export const getDataPrecio = async (tableName: string, pais: string, producto: string): Promise<any[]> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active = 1 and descripcion like '%${pais}%' and descripcion like '%${producto}%'`);
    // console.log("🚀 ~ getDataPrecio ~ result:", result)
    return result;
  } catch (error) {
    throw error;
  }
};
