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
exports.updateDataOrden = void 0;
// Tu servicio
const updateBuilder_1 = require("./updateBuilder");
const db_1 = require("../../db");
const updateDataOrden = (tableName, id, newData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 👇 Obtenemos el manager desde el DataSource
        const entityManager = db_1.AppDataSource.manager;
        const data = Object.assign({}, newData);
        const updateQuery = yield (0, updateBuilder_1.generateUpdateOr)(tableName, id, data);
        // Crear un array de valores con id al final
        const values = [...Object.values(data), id];
        // Ejecutar el query con EntityManager
        yield entityManager.query(updateQuery, values);
    }
    catch (error) {
        throw error;
    }
});
exports.updateDataOrden = updateDataOrden;
