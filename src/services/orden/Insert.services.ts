import { AppDataSource } from "../../db";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";


export async function insertDataOr(tableName: string, data: Record<string, any>): Promise<any> {
    const { customer_info, items, total, status, order_type, id_pedido, hash_pedido, status_pago, pedido } = data;

    const datosActualizados: Record<string, any> = {
        customer_info: JSON.stringify(customer_info),
        items: JSON.stringify(items),
        total,
        status,
        order_type,
        id_pedido,
        hash_pedido: JSON.stringify(hash_pedido),
        status_pago,
        pedido
    };

    const insertQuery = generateInsertQuery(tableName, datosActualizados);

    try {
        const result = await AppDataSource.query(`⁠ ${insertQuery} RETURNING *`);
        const insertedData = result[0];
        console.log("Data inserted successfully:", insertedData);
        return insertedData;
    } catch (error) {
        console.error("Error inserting data:", error);
        throw error;
    }
}