import { getManager } from 'typeorm';

export const getPaliteroxd = async (tableName: string, id:number): Promise<any[]> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active = 1 AND id_clasificacion != 1 AND id_caballete = ${id}`);
    return result;
  } catch (error) {
    throw error;
  }
};
