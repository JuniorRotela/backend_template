import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import { format } from 'date-fns';

export async function createData(tableName: string, data: Record<string, any>): Promise<any> {
  const {cod_empresa, id_proveedor, tipo, numeroNota, modelo, operacion,formaDePago, condicionPago, id_vehiculo, id_producto, cantidad_total, id_usuario} = data;

  // Crear el objeto con los datos actualizados y formateados
  let datosActualizados: Record<string, any> = {
    cod_empresa: cod_empresa,
    id_proveedor: id_proveedor,
    numeroNota: numeroNota,
    modelo: modelo,
    operacion: operacion,
    formaDePago: formaDePago,
    condicionPago: condicionPago,
    id_vehiculo: id_vehiculo,
    id_producto: id_producto,
    cantidad_total: cantidad_total,
    id_usuario: id_usuario,
    tipo: tipo,
  };
  
  // Generar la consulta de inserción
  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {
    // Obtener la conexión actual
    const connection = getConnection();

    // Ejecutar la consulta SQL y obtener el resultado de la inserción
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    // console.log("Data inserted successfully:", insertedData);
    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}