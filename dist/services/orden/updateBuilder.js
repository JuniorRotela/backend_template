"use strict";
// // genericQueries/updateBuilder.ts
// import { getConnection } from 'typeorm';
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUpdateOr = generateUpdateOr;
// export function generateUpdateOr(tableName: string, id: any, data: Record<string, any>): string {
//   const connection = getConnection();
//   const qb = connection.createQueryBuilder().update(tableName).set(data).where('pedido = :id', { id });
//   return qb.getSql();
// }
const db_1 = require("../../db");
function generateUpdateOr(tableName, id, data) {
    const connection = db_1.AppDataSource; // usar tu DataSource
    const qb = connection
        .createQueryBuilder()
        .update(tableName)
        .set(data)
        .where('pedido = :id', { id });
    return qb.getSql();
}
