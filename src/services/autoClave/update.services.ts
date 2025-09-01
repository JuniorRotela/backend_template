// Tu servicio
import { getManager } from 'typeorm';
import { generateUpdateQuery } from '../../genericQueries/updateBuilder';
import { updateCabt } from './updateCab.services';


export const updateData = async (tableName: string, id: any, newData: any): Promise<void> => {
  // console.log("🚀 ~ updateData ~ newData:", newData)
  const { estado } = newData;
  try {
    const entityManager = getManager();

    // Obtener la fecha actual
    const update_at = new Date();
  

    // Agregar la fecha actual y las fechas formateadas a newData antes de la actualización
    const data = {
      estado: estado,
      update_at,
    };

    const autoClave = {
      id_autoclave: newData.id_autoclave,
    }

    const updateQuery = await generateUpdateQuery(tableName, id, data);
    await updateCabt("orden_produccion", id, autoClave);

    // Crear un array de valores con id al final
    const values = [...Object.values(data), id];

    // Realiza la actualización en la base de datos con los valores formateados
    await entityManager.query(updateQuery, values);

  } catch (error) {
    throw error;
  }
};

