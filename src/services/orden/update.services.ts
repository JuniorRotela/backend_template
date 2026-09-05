// Tu servicio
import { generateUpdateOr } from './updateBuilder';
import { AppDataSource } from '../../db';

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