"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInsertQuery = generateInsertQuery;
function generateInsertQuery(tableName, data) {
    const columns = Object.keys(data);
    const values = Object.values(data).map(value => (typeof value === 'string' ? `'${value}'` : value));
    const sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')})`;
    return sql;
}
