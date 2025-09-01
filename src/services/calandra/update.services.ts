// Tu servicio
import { getManager } from 'typeorm';
import { generateUpdateQuery } from '../../genericQueries/updateBuilder';


export const updateDataCalandra = async (tableName: string, id: any, newData: any): Promise<void> => {

  const {id_update} = newData;
  try {
    const entityManager = getManager();

    // Obtener la fecha actual
    const update_at = new Date();

    const data = {
      ...newData,
      update_at,
      id_update
    };

    const updateQuery = await generateUpdateQuery(tableName, id, data);

    const values = [...Object.values(data), id];


    await entityManager.query(updateQuery, values);
  } catch (error) {
    throw error;
  }
};
