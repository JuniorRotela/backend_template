// import { app } from './app';

// const API_PORT = process.env.API_PORT || 5010;

// app.listen(API_PORT, () => {
//   console.log(`🚀 API corriendo en puerto ${API_PORT}`);
//   console.log(`🔌 Socket.IO corriendo en puerto 6001`);
// });

// // Manejo de errores del servidor
// app.on('error', (error) => {
//   console.error('❌ Error en el servidor:', error);
// });


import { app, httpServer } from "./app";
import { AppDataSource } from "./db";

const API_PORT = process.env.API_PORT || 5010;

// Inicializar DB primero
AppDataSource.initialize().then(() => {
  console.log("📦 Conexión a DB inicializada");

  httpServer.listen(API_PORT, () => {
    console.log(`🚀 API corriendo en puerto ${API_PORT}`);
    console.log(`🔌 Socket.IO corriendo en puerto 6001`);
  });

  httpServer.on("error", (error) => {
    console.error("❌ Error en el servidor:", error);
  });
}).catch((error) => {
  console.error("❌ Error al conectar DB:", error);
});
