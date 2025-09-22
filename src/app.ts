import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// --- Import de rutas ---
import userRoutes from './routes/user.routes'; 
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
import stock from './routes/stock.routes'; 
import pagos from './routes/pagoSalarios.routes'; 
import cargadora from './routes/cargadora.routes'; 
import Empresas from './routes/empresas.routes'; 
import Quiebra  from './routes/quiebra.routes'; 
import Precio  from './routes/precio.routes'; 
import transaccion  from './routes/transaccion.routes'; 
import orden  from './routes/orden.routes'; 

import { verifyToken } from './middleware/auth';

// --- Inicialización de Express ---
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173', // En producción, configura esto con tu dominio específico
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling'] // Asegura múltiples transportes
});

// Agregar log para debugging
io.on('connection', (socket) => {
  console.log('🔌 Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

// Función helper para enviar notificaciones
export const sendNotification = (type: string, title: string, data?: any) => {
  io.emit('notification', {
    type,
    title,
    data,
    timestamp: new Date()
  });
};

// --- Middlewares ---
app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); 

app.use(morgan('dev'));

// --- Configuración de Multer ---
const uploadDir = 'C:/reportes';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload: RequestHandler = multer({ storage }).single('image'); // ✅ tipado correcto

app.post('/upload', upload, (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No se subió ninguna imagen');
  }
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ filePath });
});

app.use('/uploads', express.static(uploadDir));

// --- Rutas ---
app.use(Aprovechamiento);
app.use(loginRoutes);
app.use(MarcacionRoutes);
app.use(transaccion);
app.use(protectedRoutes);
app.use(orden);
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// --- Celebrate errores ---
app.use(celebrateErrors());

// --- Middleware global de errores ---
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.get("/pagopar/confirmacion/:hash", (req, res) => {
  res.send("Gracias por tu compra. Hash recibido: " + req.params.hash);
});

// Modifica la exportación para incluir el httpServer
export { app, httpServer };
