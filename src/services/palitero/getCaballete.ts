import { getManager } from 'typeorm';

export const getCaballetePal = async (tableName: string): Promise<any[]> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT 
  id,
	codigo,
	descripcion,
	status_active,
	estado FROM ${tableName} WHERE status_active = 1  AND codigo LIKE 'PAL%'`);
    return result;
  } catch (error) {
    throw error;
  }
};
