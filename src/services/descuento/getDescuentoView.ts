import { getManager } from 'typeorm';

export const getDataDescuento = async (tableName: string): Promise<any[]> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active > 0 `);
    return result;
  } catch (error) {
    throw error;
  }
};
