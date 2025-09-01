// import express, { Request, Response } from "express";
// import cors from "cors";
// import getOneDta from "../src/services/interfoliacion/getOneSerie.services";


// const app = express();
// app.use(cors()); // Permitir solicitudes desde otros dispositivos
// app.use(express.json());

// app.post("/print-label", async (req: Request, res: Response) => {
//   const { serie } = req.body;

//   if (!serie) {
//     return res.status(400).json({ error: "No se recibió una serie válida." });
//   }

//   try {
//     const response = await getOneDta("ticketview",serie);
    
//     if (response === 404) {
//       return res.status(404).json({ error: `La serie ${serie} aún no está concluida.` });
//     }

//     const fecha = new Date(response.created_At).toLocaleString("es-ES");
//     let zpl = `
//       ^XA
//       ^PW800
//       ^LL400
//       ^FO30,25^A0N,28,28^FD${response.codigo}^FS
//       ^FO200,110^A0N,35,35^FD${response.medidas}^FS
//       ^FO230,180^A0N,35,35^FD${response.clasificacion}^FS
//       ^FO150,220^A0N,35,35^FD${response.obs}^FS
//       ^FO540,100^BQN,2,8^FDQA,${response.serie}^FS
//       ^FO20,320^A0N,35,35^FD${response.id_produccion}^FS
//       ^FO190,320^A0N,35,35^FD${fecha}^FS
//       ^FO550,320^A0N,35,35^FD${response.serie}^FS
//       ^XZ
//     `;

//     res.json({ success: true, zplCommand: zpl });
//   } catch (error) {
//     console.error("Error al obtener la etiqueta:", error);
//     res.status(500).json({ error: "Error al obtener los datos." });
//   }
// });

// app.listen(3000, () => console.log("🚀 Backend corriendo en http://192.168.88.43:3000"));