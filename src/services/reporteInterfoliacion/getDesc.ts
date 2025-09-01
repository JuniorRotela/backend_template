import { getManager } from 'typeorm';

export const getDataDesc = async (tableName: string): Promise<any[]> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active = 1 ORDER BY id DESC`);
    return result;
  } catch (error) {
    throw error;
  }
};
