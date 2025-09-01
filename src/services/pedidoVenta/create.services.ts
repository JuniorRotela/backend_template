
// import { getConnection } from "typeorm";
// import { generateInsertQuery } from "../../genericQueries/insertBuilder";

// export async function createData(tableName: string, data: Record<string, any>): Promise<any> {
//   const { cod_empresa, id_usuario, id_cliente, id_producto, cantida, id_precio } = data;

//   try {
//     // Obtener la conexión actual
//     const connection = getConnection();

//     // Obtener el próximo número de pedido
//     const [{ next_n_pedido }] = await connection.query(
//       `SELECT IFNULL(MAX(n_pedido), 0) + 1 AS next_n_pedido FROM ${tableName}`
//     );

//     // Crear el objeto con los datos actualizados
//     let datosActualizados: Record<string, any> = {
//       cod_empresa,
//       id_usuario,
//       n_pedido: next_n_pedido,  // Nuevo número de pedido autoincremental
//       id_cliente,
//       id_producto,
//       cantida,
//       id_precio,
//     };

//     // Generar la consulta de inserción
//     const insertQuery = generateInsertQuery(tableName, datosActualizados);

//     // Ejecutar la consulta SQL y obtener el resultado de la inserción
//     const result = await connection.query(`${insertQuery} RETURNING *`);
//     const insertedData = result[0];

//     console.log("Data inserted successfully:", insertedData);
//     return insertedData;

//   } catch (error) {
//     console.error("Error inserting data:", error);
//     throw error;
//   }
// }

import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
export async function createData(tableName: string, data: Record<string, any>): Promise<any> {
  const { cod_empresa, id_usuario, id_cliente, id_vehiculo } = data;
  const pedidos = data.data; // Extraer los pedidos del array

  try {
    const connection = getConnection();
    
    // Obtener el próximo número de pedido
    const [{ next_n_pedido }] = await connection.query(
      `SELECT IFNULL(MAX(n_pedido), 0) + 1 AS next_n_pedido FROM ${tableName}`
    );

    const insertedDataArray = [];

    for (const pedido of pedidos) {
      const { id_producto, cantidad, precio } = pedido;

      // Verificar si los valores están presentes
      if (!id_producto || !cantidad || !precio) {
        console.error("Faltan valores en el pedido:", pedido);
        continue; // Saltar este pedido si le faltan datos
      }

      let datosActualizados: Record<string, any> = {
        cod_empresa,
        id_usuario,
        n_pedido: next_n_pedido, // Mantiene el mismo número para todos los productos en este pedido
        id_cliente,
        id_producto,
        cantidad,
        precio,
        id_vehiculo,
      };

      const insertQuery = generateInsertQuery(tableName, datosActualizados);
      const result = await connection.query(`${insertQuery} RETURNING *`);
      
      insertedDataArray.push(result[0]); // Almacenar los datos insertados
    }

    console.log("Datos insertados correctamente:", insertedDataArray);
    return insertedDataArray;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}
