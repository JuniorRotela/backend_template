// Tu servicio
import { getManager } from 'typeorm';
import { generateUpdateQuery } from '../../genericQueries/updateBuilder';



export const updateData3 = async (tableName: string, id: any, newData: any): Promise<void> => {
  // console.log("🚀 ~ updateData3 ~ newData:", newData)
  try {
    const entityManager = getManager();

    // Obtener la fecha actual
    const update_at = new Date();
    const {id_caballete} = newData;

    // Agregar la fecha actual y las fechas formateadas a newData antes de la actualización
    const data = {
      ...newData,
      id_caballete: id_caballete,
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
