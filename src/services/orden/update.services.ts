// Tu servicio
import { getManager } from 'typeorm';
import { generateUpdateQuery } from '../../genericQueries/updateBuilder';
import { generateUpdateOr } from './updateBuilder';
import { AppDataSource } from '../../db';


// export const updateDataOrden = async (tableName: string, id: any, newData: any): Promise<void> => {
//   try {
//     const entityManager = getManager();

//     // Obtener la fecha actual
//     const update_at = new Date();

//     // // Convertir entrada y salida a formato de timestamp
//     // const formattedEntrada = newData.entrada ? new Date(newData.entrada * 1000) : null;
//     // const formattedSalida = newData.salida ? new Date(newData.salida * 1000) : null;

//     // Agregar la fecha actual y las fechas formateadas a newData antes de la actualización
//     const data = {
//       ...newData,

//       // entrada: formattedEntrada,
//       // salida: formattedSalida
//     };

//     const updateQuery = await generateUpdateOr(tableName, id, data);

//     // Crear un array de valores con id al final
//     const values = [...Object.values(data), id];

//     // Realiza la actualización en la base de datos con los valores formateados
//     await entityManager.query(updateQuery, values);
//   } catch (error) {
//     throw error;
//   }
// };


export const updateDataOrden = async (
  tableName: string,
  id: any,
  newData: any
): Promise<void> => {
  try {
    // 👇 Obtenemos el manager desde el DataSource
    const entityManager = AppDataSource.manager;

    const data = {
      ...newData,
    };

    const updateQuery = await generateUpdateOr(tableName, id, data);

    // Crear un array de valores con id al final
    const values = [...Object.values(data), id];

    // Ejecutar el query con EntityManager
    await entityManager.query(updateQuery, values);
  } catch (error) {
    throw error;
  }
};