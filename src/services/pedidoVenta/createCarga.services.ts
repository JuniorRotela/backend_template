import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
// import { format, parseISO } from 'date-fns';
// import getOneMarcacion from "./getOne.services";
import  getOneDta  from "../../services/pedidoVenta/getOneSerie.services";
import { updateData } from "../../services/pedidoVenta/update.services";



export async function insertDataCarga(tableName: string, data: Record<string, any>): Promise<any> {
  const { serie, descripcion, id_pedido, cod_empresa, id_usuario, n_pedido, cantidad, id_vehiculo } = data;

  let datosActualizados: Record<string, any> = {
    id_pedido,
    cod_empresa,
    id_usuario,
    n_pedido,
    cantidad,
    serie,
    id_vehiculo,
  };

  const serieValidate = await getOneDta("carga_pedido", serie);
  console.log("🚀 ~ insertDataCarga ~ serieValidate:", serieValidate)

  if (serieValidate) {
    if (serieValidate.serie == serie) {
      throw new Error("Ya se registró esta serie");
    }
    
    if (serieValidate.id_vehiculo == id_vehiculo) {
      const update = { cantidad: serieValidate.cantidad + data.cantidad };
      await updateData("carga_pedido", serieValidate.id, update);
      return { message: "Registro actualizado correctamente" };
    }
  }

  // Si la serie no existe o es Monolítico sin coincidencia en id_vehiculo, insertar
  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {
    const connection = getConnection();
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    console.log("Data inserted successfully:", insertedData);
    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}
