
import { createServer } from 'http';
// import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
import express, { Request, Response, NextFunction } from 'express';
// import temperaturaEmitter from './temperatura';
import morgan from 'morgan';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';
import userRoutes from './routes/user.routes'; 
// import {loginController} from './controllers/login.controllers';
import loginRoutes from './routes/login.routes';
import protectedRoutes from './routes/protected.routes';
import LevelRoutes from './routes/level.routes';
import MarcacionRoutes from './routes/marcacion.routes';
import descuentoRoutes from './routes/descuento.routes';
import gruposRoutes from './routes/grupos.routes';
import horariosRoutes from './routes/horarios.routes';
import salarioRoutes from './routes/salarios.routes';
import horasExtrasRoutes from './routes/horasExtras.routes'; 
import plus from './routes/plus.routes'; 
import metas from './routes/metas.routes'; 
import prodcutos from './routes/productos.routes'; 
import calandra from './routes/calandra.routes'; 
import interfoliacion from './routes/interfoliacion.routes'; 
import clasificacion from './routes/clasificacion.routes'; 
import pvb from './routes/pvb.routes'; 
import graficos from './routes/graficos.routes'; 
// import Interfoliacion from './routes/interfoliacion.routes'; 
import Aprovechamiento from './routes/aprovechamiento.routes'; 
import prueba from './routes/prueba.routes';
import autoClave from './routes/autoClave.routes'; 
import caballete from './routes/caballete.routes'; 
import reporteDescarga from './routes/reporteDescarga.routes'; 
import reporteLavadora from './routes/reporteLavadora.routes'; 
import reporteSalaLimpia from './routes/reporteSalaLimpia.routes'; 
import reporteCalandra from './routes/reporteCalandra.routes';
import reporteInterfoliacion from './routes/reporteInterfoliacion.routes';
import reporteStock from './routes/reporteStock.routes'; 
import Productos from './routes/productos.routes'; 
import Proveedor from './routes/proveedor.routes';
import OrdenProduccion from './routes/ordenProduccion.routes'; 
import Clasificacion from './routes/clasificacion.routes'; 
import Vehiculos from './routes/vehiculos.routes'; 
import Cliente from './routes/cliente.routes'; 
import SalaLimpia from './routes/salaLimpia.routes'; 
import Exportacion from './routes/exportacion.routes'; 
import Palitero from './routes/palitero.routes'; 



import EntradaNotaFiscal from './routes/entradaNotaFiscal.routes'; 
import PedidoVenta from './routes/pedidoVenta.routes'; 
import {PostReporteLavadora} from './services/reporteLavadora/insertTruck.services'; 
import { verifyToken } from './middleware/auth';
import { PostReporteSalaLimpia } from './services/reporteSalaLimpia/insertSL.services';
// import { updateReporteSalaLimpia } from './controllers/reporteSalaLimpia.controllers';
import { UpdateReporteSL } from './services/reporteSalaLimpia/updateSL.services'
import { PostReporteCalandraSK } from '../src/controllers/reporteCalandra.controllers'
import stock from './routes/stock.routes'; 
import pagos from './routes/pagoSalarios.routes'; 
import cargadora from './routes/cargadora.routes'; 
import { produccionSocket, produccionUpdateSocket } from './socket/produccionSocket';
import { fetchLavadoData } from './controllers/cargadora.controllers';
import Empresas from './routes/empresas.routes'; 
import Quiebra  from './routes/quiebra.routes'; 
import Precio  from './routes/precio.routes'; 

import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(cors({
  origin: '*', // Permitir CORS para cualquier origen
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));  // Aumenta el límite para JSON
app.use(express.urlencoded({ limit: '50mb', extended: true })); 

// app.use(temperaturaEmitter);

const uploadDir = 'C:/reportes';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ruta para subir imágenes
app.post('/upload', upload.single('image'), (req, res) => {
  // console.log(req.file);
  if (!req.file) {
    return res.status(400).send('No se subió ninguna imagen');
  }
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ filePath });
});

app.use('/uploads', express.static(uploadDir));

// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   },
//   pingInterval: 10000, // Verifica cada 10s si un cliente sigue conectado
//   pingTimeout: 5000,
// }); 

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(Aprovechamiento);
app.use(loginRoutes);
app.use(MarcacionRoutes);


// app.get('/temperatura', (req, res) => {
//   const temperatura = req.query.temperatura; // Obtener el parámetro de la URL
//   // console.log(`Temperatura recibida: ${temperatura}°C`);
//   io.emit('temperaturaActualizada', { temperatura });
//   res.status(200).send(`${temperatura}°C`);
// });

app.use(protectedRoutes);
app.use(verifyToken);
app.use(userRoutes);
app.use(Empresas);
app.use(Palitero);
app.use(Quiebra);
app.use(descuentoRoutes);
app.use(gruposRoutes);
app.use(LevelRoutes);
app.use(horariosRoutes);
app.use(salarioRoutes);
app.use(horasExtrasRoutes);
app.use(plus);
app.use(metas);
app.use(prodcutos);
app.use(calandra);
app.use(interfoliacion);
app.use(clasificacion);
app.use(caballete);
app.use(pvb);
app.use(graficos);
// app.use(Interfoliacion);
app.use(prueba);
app.use(autoClave);
app.use(caballete);
app.use(reporteDescarga);
app.use(reporteLavadora);
app.use(reporteSalaLimpia);
app.use(reporteCalandra);
app.use(reporteInterfoliacion);
app.use(reporteStock);
app.use(Productos);
app.use(Proveedor);
app.use(Clasificacion);
app.use(OrdenProduccion);
app.use(stock);
app.use(pagos);
app.use(Vehiculos);
app.use(Cliente);
app.use(EntradaNotaFiscal);
app.use(SalaLimpia);
app.use(Exportacion);
app.use(PedidoVenta);
app.use(Precio);
app.use(cargadora);

// app.use(cargadora);

// produccionSocket(io);
// produccionUpdateSocket(io)


// io.on('connection', (socket) => {
  // console.log('Sector conectado');
  
  //Servicios Post
  // Evento que emite el registro de lavadora a sala limpia
  // socket.on('PostReporteLavadora', (data) => {
  //   console.log("Datos Socket", data)
  //   // Enviar los datos a sala limpia
  //   io.emit('mostrar_modal_sala_limpia', data);
  // });

  // socket.on('disconnect', () => {
  //   console.log('Sector desconectado');
  // });
    
  // socket.on('PostReporteLavadora', async ({ datos }) => {
  //   try {
  //     // Inserta los datos del reporte de lavadora en la base de datos
  //     const createdLavadoraReport = await PostReporteLavadora(datos); // Asumiendo que tienes una función que hace esto
  //     // console.log("Datos en el back", datos)
  //     // Emitir el evento de vuelta a todos los clientes conectados con los datos completos del reporte de lavadora creado
  //     io.emit('lavadoraReportUpdated', createdLavadoraReport);

  //     // Emitir un evento solo al cliente que envió el reporte para confirmar la creación exitosa
  //     socket.emit('lavadoraReportCreated', createdLavadoraReport);
  //   } catch (error) {
  //     console.error("Error creando el reporte de lavadora:", error);

  //     // Manejo de errores específicos o generales
  //     if (error instanceof Error) {
  //       socket.emit('lavadoraReportCreated', { error: error.message });
  //     } else {
  //       socket.emit('lavadoraReportCreated', { error: 'Error desconocido' });
  //     }
  //   }
  // });


// Evento que emite el registro de salaLimpia a calandra
  // socket.on('PostReporteSalaLimpiaSK', (data) => {
  //   console.log("Datos PostSL back", data)
  //   // Enviar los datos a calandra
  //   io.emit('mostrar_modal_calandra', data);
  // });

  // socket.on('PostReporteSalaLimpiaSK', async ({ datos }) => {
  //   try {
  //     // Inserta los datos del reporte de lavadora en la base de datos
  //     const createdSalaLimpiaReport = await PostReporteSalaLimpia(datos); // Asumiendo que tienes una función que hace esto
  //     // console.log("Datos en SL el back", datos)
  //     // Emitir el evento de vuelta a todos los clientes conectados con los datos completos del reporte de SL creado
  //     io.emit('salalimpiaReportUpdated', createdSalaLimpiaReport);

  //     // Emitir un evento solo al cliente que envió el reporte para confirmar la creación exitosa
  //     socket.emit('salaLimpiaReportCreated', createdSalaLimpiaReport);
  //   } catch (error) {
  //     console.error("Error creando el reporte de lavadora:", error);

  //     // Manejo de errores específicos o generales
  //     if (error instanceof Error) {
  //       socket.emit('salaLimpiaReportCreated', { error: error.message });
  //     } else {
  //       socket.emit('salaLimpiaReportCreated', { error: 'Error desconocido' });
  //     }
  //   }
  // });

// Evento que emite el registro de salaLimpia a calandra
  // socket.on('PostReporteCalandraSK', (data) => {
  //   console.log("Datos PostSL back", data)
  //   // Enviar los datos a calandra
  //   io.emit('mostrar_modal_inter', data);
  // });
  // socket.on('disconnect', () => {
  //   console.log('Sector desconectado');
  // });
    
//   socket.on('PostReporteCalandraSK', async ({ datos }) => {
//     try {
//       // Inserta los datos del reporte de lavadora en la base de datos
//       const createdCalandraReport = await PostReporteCalandraSK(datos); 
//       // console.log("Datos en SL el back", datos)
//       // Emitir el evento de vuelta a todos los clientes conectados con los datos completos del reporte de SL creado
//       io.emit('calandraReportUpdated', createdCalandraReport);

//       // Emitir un evento solo al cliente que envió el reporte para confirmar la creación exitosa
//       socket.emit('calandraReportCreated', createdCalandraReport);
//     } catch (error) {
//       console.error("Error creando el reporte de calandra:", error);

//       // Manejo de errores específicos o generales
//       if (error instanceof Error) {
//         socket.emit('calandraReportCreated', { error: error.message });
//       } else {
//         socket.emit('calandraReportCreated', { error: 'Error desconocido' });
//       }
//     }
//   });


//   // Servicios Update
//   // Evento que emite el actualizacion y registro de salaLimpia a calandra
//   socket.on('UpdateReporteSalaLimpiaSK', async ({ id, datos }) => {
    
//     try {
//       // Emitir los datos a los clientes conectados a Calandra
//       io.emit('mostrar_modal_calandra', {datos});
  
//       //función que actualiza el reporte en la base de datos
//       const updatedSalaLimpiaReport = await UpdateReporteSL(id, datos);
//       // console.log("Datos actualizados en SL en el backend:", updatedSalaLimpiaReport);
  
//       // Emitir el evento de vuelta a todos los clientes conectados con los datos completos del reporte de SL actualizado
//       io.emit('salalimpiaReportUpdated', updatedSalaLimpiaReport);
  
//       // Emitir un evento solo al cliente que solicitó la actualización para confirmar que fue exitosa
//       socket.emit('salaLimpiaReportUpdated', updatedSalaLimpiaReport);
  
//     } catch (error) {
//       console.error("Error actualizando el reporte de lavadora:", error);
  
//       // Manejo de errores específicos o generales
//       const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
//       socket.emit('salaLimpiaReportUpdated', { error: errorMessage });
//     }
//   });

// });





app.use(celebrateErrors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// const PORT = process.env.PORT || 6001;
// server.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });

// export { io, server }; // Exporta `io` y `server`
export default app;