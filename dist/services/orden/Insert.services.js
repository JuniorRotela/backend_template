"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDataOr = insertDataOr;
const db_1 = require("../../db");
const insertBuilder_1 = require("../../genericQueries/insertBuilder");
function insertDataOr(tableName, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { customer_info, items, total, status, order_type, id_pedido, hash_pedido, status_pago, pedido } = data;
        const datosActualizados = {
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
        const insertQuery = (0, insertBuilder_1.generateInsertQuery)(tableName, datosActualizados);
        try {
            // Ejecutar el insert
            const result = yield db_1.AppDataSource.query(insertQuery);
            // Recuperar el último insertId
            const insertId = result.insertId;
            // Hacer un select del registro recién insertado
            const [insertedData] = yield db_1.AppDataSource.query(`SELECT * FROM ${tableName} WHERE id = ?`, [insertId]);
            console.log("Data inserted successfully:", insertedData);
            return insertedData;
        }
        catch (error) {
            console.error("Error inserting data:", error);
            throw error;
        }
    });
}
