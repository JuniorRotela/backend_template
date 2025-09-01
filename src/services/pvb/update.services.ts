// Tu servicio
import { getManager } from 'typeorm';
import { generateUpdateQuery } from '../../genericQueries/updateBuilder';
import {getPvb} from "./getOnePvb.services"


// export const updateData = async (tableName: string, id: any, newData: any): Promise<void> => {
//   try {
//     const entityManager = getManager();
//     const response = await getPVB("stockpvb", id)
//     // Obtener la fecha actual
//     const update_at = new Date();
//     const {largo} = newData
//     // Agregar la fecha actual y las fechas formateadas a newData antes de la actualización
//     const data = {
//       largo: response.largo - largo,
//       update_at,
//     };

//     const updateQuery = await generateUpdateQuery(tableName, id, data);

//     // Crear un array de valores con id al final
//     const values = [...Object.values(data), id];

//     // Realiza la actualización en la base de datos con los valores formateados
//     const result = await entityManager.query(updateQuery, values);

//     return result;
//   } catch (error) {
//     throw error;
//   }
// };


export const updateData = async (tableName: string, id: any, newData: any): Promise<any> => {
  try {
    const entityManager = getManager();
    const response = await getPvb("stockpvb", id);
    
    if (!response) {
      throw new Error(`No se encontró el registro con ID: ${id} en la tabla "stockpvb"`);
    }
    const firstThreeDigits = newData.match(/\d{3}/)[0]; 
    
    // Obtener la fecha actual
    const update_at = new Date();
    let { largo } = newData;

    // Ajustar el valor de largo si es necesario
    largo = parseInt(firstThreeDigits) === 321 ? 3280 : 3650;

    // Preparar los datos para la actualización
    const data = {
      largo: response.largo - largo,
      update_at,
    };

    // Generar la consulta de actualización
    const updateQuery = await generateUpdateQuery(tableName, id, data);

    // Crear un array de valores con id al final
    const values = [...Object.values(data), id];

    // Ejecutar la actualización en la base de datos
    const result = await entityManager.query(updateQuery, values);

    return result; // Retornar el resultado de la actualización
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
    throw error;
  }
};
