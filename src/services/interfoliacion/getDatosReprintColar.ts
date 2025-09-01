import { getManager } from 'typeorm';

export const getDataReprintColar = async (data: string): Promise<any[]> => {
  const tableName = "interfoliacion";
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE  colar = "${data}" and status_active = 1`);
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};


