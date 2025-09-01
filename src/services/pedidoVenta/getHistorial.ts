import { getManager } from 'typeorm';

export const getHistorial = async (tableName: string): Promise<any | null> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName}`);

    if (result && result.length > 0) {
      return result;
    } else {
      return null; // Devuelve null si no se encuentra ningún registro
    }
  } catch (error) {
    throw error;
  }
};


export default getHistorial;
