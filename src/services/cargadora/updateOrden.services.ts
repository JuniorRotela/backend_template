import { getConnection } from "typeorm";

export const updateOrdenDat = async (
  tableName: string,
  orden: number,
  estado: number,
  updateData: Record<string, any>
): Promise<any> => {
  console.log("🚀 ~ updateData:", updateData)
  try {
    // Validar el nombre de la tabla
    if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
      throw new Error("Nombre de tabla inválido.");
    }

    // Validar que `updateData` contenga datos
    if (!updateData || typeof updateData !== "object" || Object.keys(updateData).length === 0) {
      throw new Error("No hay datos válidos para actualizar.");
    }

    const connection = getConnection();

    // Construir las partes de la consulta para múltiples campos
    const setClause = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updateData);

    // Añadir los valores de las condiciones al final
    values.push( orden, estado);

    // Ejecutar la consulta para actualizar el registro
    const result = await connection.query(
      `UPDATE ${tableName} SET ${setClause} WHERE orden = ? AND status_active = 1 AND estado != 3  `,
      values
    );
      // console.log("🚀 ~ values:", values)

    // console.log("Actualización completada correctamente.", result);
    return { success: true, result };
  } catch (error) {
    console.error("Error actualizando datos:", error);
    throw error;
  }
};
