"use strict";
// import 'reflect-metadata';
// import { createConnection, ConnectionOptions } from 'typeorm';
// import {app} from './app';
// import { AppDataSource } from './db';
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
// async function main() {
//   try {
//     // Configura la conexión de TypeORM con SqlServerConnectionOptions
//     await createConnection(AppDataSource as ConnectionOptions);
//     // Inicia tu aplicación después de que la conexión se haya establecido
//     app.listen(5010, '0.0.0.0');
//     console.log('Server is listening on port', 5010);
//   } catch (error) {
//     console.error(error);
//   }
// }
// main();
require("reflect-metadata");
const app_1 = require("./app");
const db_1 = require("./db");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Inicializar la conexión con DataSource
            yield db_1.AppDataSource.initialize();
            app_1.app.listen(5003, '0.0.0.0');
            console.log('Server is listening on port', 5003);
        }
        catch (error) {
            console.error('Error starting the server:', error);
        }
    });
}
main();
