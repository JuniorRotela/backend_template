import { getManager } from 'typeorm';

export const getPaliteroxdColar = async (tableName: string, id:number): Promise<any[]> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(
      `SELECT colar FROM ?? WHERE status_active = 1 AND id_caballete = ? LIMIT 1`,
      [tableName, id]
    );
    
    return result;
  } catch (error) {
    throw error;
  }
};
