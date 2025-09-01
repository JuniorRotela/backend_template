// Tu servicio
import { getManager } from 'typeorm';
import { generateUpdateQuery } from '../genericQueries/updateBuilder';

export const updateData = async (tableName: string, id: any, newData: any): Promise<void> => {
  try {
    const entityManager = getManager();

    // Obtener la fecha actual
    const update_at = new Date();

    // Convertir entrada y salida a formato de timestamp
    const formattedEntrada = newData.entrada ? new Date(newData.entrada * 1000) : null;
    const formattedSalida = newData.salida ? new Date(newData.salida * 1000) : null;

    // Agregar la fecha actual y las fechas formateadas a newData antes de la actualización
    const data = {
      ...newData,
      update_at,
      entrada: formattedEntrada,
      salida: formattedSalida
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
