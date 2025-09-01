
import { getConnection } from "typeorm";
// import getOne from "../stock/getCodInterno.services"
// import {updateData2} from "../stock/update.services"

export const updateChapa = async (
  tableName: string,
  orden: number,
  serie: string,
  updateData: Record<string, any>
): Promise<any> => {
  try {
    // Validar el nombre de la tabla
    if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
      throw new Error("Nombre de tabla inválido.");
    }

    // Validar que `updateData` contenga datos
    if (!updateData || typeof updateData !== "object" || Object.keys(updateData).length === 0) {
      throw new Error("No hay datos válidos para actualizar.");
    }

    // console.log("🚀 ~ updateData:", updateData);
    // const paquete1 = await getOne("stock",updateData.chapa1)
    // console.log("🚀 ~ paquete1:", paquete1)
    // const paquete2 = await getOne("stock",updateData.chapa2)
    // console.log("🚀 ~ paquete2:", paquete2)
    
    // const data = {
    //   cantidad_entrada: paquete1.cantidad_entrada - 1
    // }

    // const data2 = {
    //   cantidad_entrada: paquete2.cantidad_entrada - 1
    // }

    // const update = await updateData2("stock",paquete1.id, data)
    // const update2 = await updateData2("stock",paquete2.id, data2)

    const connection = getConnection();

    // Construir la cláusula SET de la consulta
    const setClause = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updateData);

    // Añadir las condiciones `orden` y `serie`
    values.push(orden, serie);

    // Construir y ejecutar la consulta
    const query = `
      UPDATE ${tableName} 
      SET ${setClause} 
      WHERE orden = ? AND status_active = 1 AND estado != 3 AND serie = ?
    `;
    
    const result = await connection.query(query, values);

    console.log("Actualización completada correctamente.", result);
    return { success: true, result };
  } catch (error) {
    console.error("Error actualizando datos:", error);
    throw error;
  }
};
