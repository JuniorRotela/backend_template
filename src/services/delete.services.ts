import { getManager } from 'typeorm';

export const deleteGardenData = async (tableName: string, newData: any, id: any): Promise<void> => {
  try {
    const entityManager = getManager();

    // Establecemos la fecha de actualización al momento actual
    const status_active = 0;

    // Copiamos los datos nuevos a un nuevo objeto y agregamos la fecha de actualización
    const updateData = { ...newData, status_active };

    // Obtenemos el id del registro a actualizar
    const id_u = id;

    // Realizamos la actualización en la base de datos
    await entityManager.update(tableName, id_u, updateData);
  } catch (error) {
    throw error;
  }
};
