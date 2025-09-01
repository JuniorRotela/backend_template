import { getManager } from 'typeorm';

export const getLaminado = async (tableName: string): Promise<any[]> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active = 1 and id_categoria=2`);
    return result;
  } catch (error) {
    throw error;
  }
};
