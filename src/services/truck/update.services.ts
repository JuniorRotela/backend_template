import { getManager } from 'typeorm';
import { generateUpdateQuery } from '../../genericQueries/updateBuilder';

export const updateData = async (tableName: string, id: any, newData: any): Promise<void> => {
  try {
    const entityManager = getManager();

    // Obtener la fecha actual
    const update_at = new Date();

    // console.log("datos", newData);

    const { id_state, id_hangar, ...restData } = newData;

    // Filtrar claves con valores `undefined`
    const filteredData = Object.fromEntries(
      Object.entries({ ...restData, id_state, id_hangar, update_at }).filter(([_, value]) => value !== undefined)
    );

    // console.log("filteredData", filteredData);

    const updateQuery = await generateUpdateQuery(tableName, id, filteredData);

    // Crear un array de valores con id al final
    const values = [...Object.values(filteredData), id];

    // Realiza la actualización en la base de datos con los valores formateados
    await entityManager.query(updateQuery, values);
  } catch (error) {
    throw error;
  }
};
