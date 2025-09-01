import { getManager } from 'typeorm';

export const getDataInterfoliacion = async (tableName: string, colar: string, serie: string): Promise<any | null> => {
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE status_active = 1 and colar = "${colar}" and serie = ${serie}`);
    // console.log("🚀 ~ getDataPrecio ~ result:", result)
    if (result && result.length > 0) {
      return result;
    } else {
      return null; // Devuelve null si no se encuentra ningún registro
    }
  } catch (error) {
    throw error;
  }
};
export default getDataInterfoliacion;
