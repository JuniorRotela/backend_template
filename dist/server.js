"use strict";
// import { app } from './app';
Object.defineProperty(exports, "__esModule", { value: true });
// const API_PORT = process.env.API_PORT || 5010;
// app.listen(API_PORT, () => {
//   console.log(`🚀 API corriendo en puerto ${API_PORT}`);
//   console.log(`🔌 Socket.IO corriendo en puerto 6001`);
// });
// // Manejo de errores del servidor
// app.on('error', (error) => {
//   console.error('❌ Error en el servidor:', error);
// });
const app_1 = require("./app");
const db_1 = require("./db");
const API_PORT = process.env.API_PORT || 5003;
// Inicializar DB primero
db_1.AppDataSource.initialize().then(() => {
    console.log("📦 Conexión a DB inicializada");
    app_1.httpServer.listen(API_PORT, () => {
        console.log(`🚀 API corriendo en puerto ${API_PORT}`);
        console.log(`🔌 Socket.IO corriendo en puerto 6001`);
    });
    app_1.httpServer.on("error", (error) => {
        console.error("❌ Error en el servidor:", error);
    });
}).catch((error) => {
    console.error("❌ Error al conectar DB:", error);
});
