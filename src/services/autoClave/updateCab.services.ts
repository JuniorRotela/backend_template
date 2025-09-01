// Tu servicio
import { getManager } from 'typeorm';
import { generateCabOrden } from './updateCabOrden';


export const updateCabt = async (tableName: string, id: any, newData: any): Promise<void> => {
  console.log("🚀 ~ updateData ~ newData:", newData)
  try {
    const entityManager = getManager();


    const autoClave = {
      id_autoclave: newData.id_autoclave,
    }
    const xd = await generateCabOrden(tableName, id, autoClave);

    // Crear un array de valores con id al final
    const valuesxd = [...Object.values(autoClave), id];

    // Realiza la actualización en la base de datos con los valores formateados

    await entityManager.query(xd, valuesxd);
  } catch (error) {
    throw error;
  }
};

