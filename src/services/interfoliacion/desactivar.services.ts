// Tu servicio
import { getManager } from 'typeorm';
import { generateUpdateQuery } from '../../genericQueries/updateBuilder';
import getOneDta  from "./getOneSerie.services"

export const desactivar = async (tableName: string, id: any, newData: any): Promise<void> => {
  try {
    const entityManager = getManager();
    const response = await getOneDta(tableName, id);
    // console.log("🚀 ~ desacti ~ response:", response)
    id = response.id;
    // Obtener la fecha actualz
    const update_at = new Date();

    // Agregar la fecha actual y las fechas formateadas a newData antes de la actualización
    const data = {
      status_active: 0,
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
