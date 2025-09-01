import { getManager } from 'typeorm';

export const getDataLaminado = async (tableName: string): Promise<any[]> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active = 1 and descripcion LIKE '%VIDRO LAMINADO%' `);
    return result;
  } catch (error) {
    throw error;
  }
};
