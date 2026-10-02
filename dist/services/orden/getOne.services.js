"use strict";
// import { getConnection } from "typeorm";
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
exports.getOneOrdenx = void 0;
// export const getOneOrdenx = async (tableName: string, id: number): Promise<any | null> => {
//   try {
//     // Obtiene la conexión actual
//     const connection = getConnection();
//     // Ejecuta la consulta SQL para obtener un único registro por ID
//     const result = await connection.query(`SELECT * FROM ${tableName} WHERE pedido = ${id}`, [id]);
//     // Verifica si se encontró un registro
//     if (result && result.length > 0) {
//       return result[0];
//     } else {
//       return null; // Devuelve null si no se encuentra ningún registro
//     }
//   } catch (error) {
//     console.error("Error getting  data:", error);
//     throw error;
//   }
// };
const db_1 = require("../../db");
const getOneOrdenx = (tableName, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Usar parámetros para evitar SQL injection
        const result = yield db_1.AppDataSource.query(`SELECT * FROM ${tableName} WHERE pedido = ?`, [id]);
        return result.length > 0 ? result[0] : null;
    }
    catch (error) {
        console.error("Error getting data:", error);
        throw error;
    }
});
exports.getOneOrdenx = getOneOrdenx;
