import { getManager } from 'typeorm';

export const getMonolitico = async (tableName: string): Promise<any[]> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active = 1 and id_categoria=1`)
    return result;
  } catch (error) {
    throw error;
  }
};
