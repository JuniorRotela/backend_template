import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import { updateData } from "../grupos/update.services";


export async function insertDataOr(tableName: string, data: Record<string, any>): Promise<any> {
    const { customer_info, items, total, status, order_type, id_pedido, hash_pedido, status_pago, pedido } = data;

    // Convertir objetos a JSON
    let datosActualizados: Record<string, any> = {
        customer_info: JSON.stringify(customer_info),  // Convertir a JSON
        items: JSON.stringify(items),                  // Convertir a JSON
        total: total,
        status: status,
        order_type: order_type,
        id_pedido: id_pedido,
        hash_pedido: JSON.stringify(hash_pedido),      // Convertir a JSON
        status_pago: status_pago,
        pedido: pedido
    };

    // Resto del código保持不变...
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