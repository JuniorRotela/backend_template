import { getManager } from 'typeorm';

export const getDataPrecio = async (tableName: string): Promise<any[]> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active = 1`);
    // console.log("🚀 ~ getDataPrecio ~ result:", result)
    return result;
  } catch (error) {
    throw error;
  }
};
