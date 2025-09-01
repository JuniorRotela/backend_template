import { getManager } from 'typeorm';

export const getDataSerieColar = async (data: string): Promise<any[]> => {
  const tableName = "colarPesoView";
  try {
    const entityManager = getManager();
    const result = await entityManager.query(`SELECT * FROM ${tableName} WHERE  colar = "${data}"`);
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};


