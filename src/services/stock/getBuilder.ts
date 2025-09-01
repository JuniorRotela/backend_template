import { getManager } from 'typeorm';

export const getData2 = async (tableName: string): Promise<any[]> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active = 2 `);
    return result;
  } catch (error) {
    throw error;
  }
};