// Tu servicio
import { getManager } from 'typeorm';
import { generateUpdateQuery } from '../../genericQueries/updateBuilder';


export const updateData = async (tableName: string, id: any, newData: any): Promise<void> => {
  try {
    const entityManager = getManager();

    // Obtener la fecha actual
    const update_at = new Date();

    const data = {
      ...newData,
      update_at,
    };

    const updateQuery = await generateUpdateQuery(tableName, id, data);

    // Crear un array de valores con id al final
    const values = [...Object.values(data), id];

    // Realiza la actualización en la base de datos con los valores formateados
    await entityManager.query(updateQuery, values);
  } catch (error) {
    throw error;
  }
};
