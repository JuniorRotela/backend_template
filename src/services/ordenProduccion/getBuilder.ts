import { getManager } from 'typeorm';

export const getDatas = async (tableName: string): Promise<any[]> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active = 1 order by id desc`);
    return result;
  } catch (error) {
    throw error;
  }
};
