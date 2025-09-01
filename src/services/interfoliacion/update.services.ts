import { getManager } from 'typeorm';
import { generateUpdateQuery } from '../../services/interfoliacion/updateBuilder';
import { getDataSerieColar } from './getSerieColar';

export const updateDataInterfoliacion = async (tableName: string, newData: any): Promise<any> => {
  try {
    console.log("datos", newData);
    const entityManager = getManager();

    // Obtener la fecha actual
    const update_at = new Date();

    // Agregar la fecha actual y las fechas formateadas a newData antes de la actualización
    const data = {
      ...newData,
      update_at
    };

    // Generar la consulta de actualización
    const updateQuery = await generateUpdateQuery(tableName, data);
    console.log("🚀 ~ updateDataInterfoliacion ~ updateQuery:", updateQuery);

    // Crear un array de valores
    const values = [...Object.values(data)];

    // Realiza la actualización en la base de datos
    await entityManager.query(updateQuery, values);

    // Verifica si `id_clasificacion` existe en `newData`
    const id_clasificacion = newData.id_clasificacion || 1;

    // Obtener los registros actualizados usando la condición original de la consulta
    const selectQuery = `SELECT * FROM ${tableName} WHERE colar = ? AND id_clasificacion = ?`;
    const updatedData = await entityManager.query(selectQuery, [data.colar, id_clasificacion]);
    //  console.log("🚀 ~ data ~ updatedData:", data.colar);

    const response = getDataSerieColar(data.colar);
    // console.log("🚀 ~  ~ response:", response)
    

    return response;
  } catch (error) {
    throw error;
  }
};
