import { Server, Socket } from 'socket.io';
import { fetchLavadoData, updateOrdendx,  } from '../controllers/cargadora.controllers';
// import { data } from 'cheerio/dist/commonjs/api/attributes';



// Manejar la conexión de Socket.IO
export const produccionSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
      // console.log("Cliente conectado en Lavadora Socket:", socket.id);
  
      socket.on("VistaProduccion", async () => {
        try {
          const data = await fetchLavadoData();
        //   console.log("Datos enviados al cliente:", data);
          socket.emit("VistaProduccionData", { data });
        } catch (error) {
          console.error("Error obteniendo datos de Lavadora:", error);
          socket.emit("VistaProduccionData", { error: error instanceof Error ? error.message : "Error desconocido" });
        }
      });
      
      socket.on("disconnect", () => {
        console.log("Cliente desconectado del Lavadora Socket:", socket.id);
      });
    });
  };


  export const produccionUpdateSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
      // console.log("Cliente Update en Lavadora Socket:", socket.id);
  
      socket.on("updateProduccion", async ({ Id, dataxd }) => {
        // console.log("id",Id);
        // console.log("data", dataxd);
        try {
           const data = await updateOrdendx(Id, dataxd);
          //  console.log("Datos enviados al cliente:", data);
          socket.emit("ProduccionUpdated", { data }); 
        } catch (error) {
          console.error("Error obteniendo datos de Lavadora:", error);
          socket.emit("ProduccionUpdated", { error: error instanceof Error ? error.message : "Error desconocido" });
        }
      });
  
      socket.on("disconnect", () => {
        console.log("Cliente desconectado del Lavadora Socket:", socket.id);
      });
    });
  };
