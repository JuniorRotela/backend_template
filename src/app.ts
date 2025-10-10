// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import dotenv from 'dotenv';
// dotenv.config();

// import nodemailer from 'nodemailer';
// import express, { Request, Response, NextFunction, RequestHandler } from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
// import { errors as celebrateErrors } from 'celebrate';
// import bodyParser from 'body-parser';
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';

// // --- Import de rutas ---
// import userRoutes from './routes/user.routes'; 
// import loginRoutes from './routes/login.routes';
// import protectedRoutes from './routes/protected.routes';
// import LevelRoutes from './routes/level.routes';
// import MarcacionRoutes from './routes/marcacion.routes';
// import descuentoRoutes from './routes/descuento.routes';
// import gruposRoutes from './routes/grupos.routes';
// import horariosRoutes from './routes/horarios.routes';
// import salarioRoutes from './routes/salarios.routes';
// import horasExtrasRoutes from './routes/horasExtras.routes'; 
// import plus from './routes/plus.routes'; 
// import metas from './routes/metas.routes'; 
// import prodcutos from './routes/productos.routes'; 
// import calandra from './routes/calandra.routes'; 
// import interfoliacion from './routes/interfoliacion.routes'; 
// import clasificacion from './routes/clasificacion.routes'; 
// import pvb from './routes/pvb.routes'; 
// import graficos from './routes/graficos.routes'; 
// import Aprovechamiento from './routes/aprovechamiento.routes'; 
// import prueba from './routes/prueba.routes';
// import autoClave from './routes/autoClave.routes'; 
// import caballete from './routes/caballete.routes'; 
// import reporteDescarga from './routes/reporteDescarga.routes'; 
// import reporteLavadora from './routes/reporteLavadora.routes'; 
// import reporteSalaLimpia from './routes/reporteSalaLimpia.routes'; 
// import reporteCalandra from './routes/reporteCalandra.routes';
// import reporteInterfoliacion from './routes/reporteInterfoliacion.routes';
// import reporteStock from './routes/reporteStock.routes'; 
// import Productos from './routes/productos.routes'; 
// import Proveedor from './routes/proveedor.routes';
// import OrdenProduccion from './routes/ordenProduccion.routes'; 
// import Clasificacion from './routes/clasificacion.routes'; 
// import Vehiculos from './routes/vehiculos.routes'; 
// import Cliente from './routes/cliente.routes'; 
// import SalaLimpia from './routes/salaLimpia.routes'; 
// import Exportacion from './routes/exportacion.routes'; 
// import Palitero from './routes/palitero.routes'; 
// import EntradaNotaFiscal from './routes/entradaNotaFiscal.routes'; 
// import PedidoVenta from './routes/pedidoVenta.routes'; 
// import stock from './routes/stock.routes'; 
// import pagos from './routes/pagoSalarios.routes'; 
// import cargadora from './routes/cargadora.routes'; 
// import Empresas from './routes/empresas.routes'; 
// import Quiebra  from './routes/quiebra.routes'; 
// import Precio  from './routes/precio.routes'; 
// import transaccion  from './routes/transaccion.routes'; 
// import orden  from './routes/orden.routes'; 

// import { verifyToken } from './middleware/auth';

// // --- Inicialización de Express ---
// const app = express();
// const httpServer = createServer(app);


// const io = new Server(httpServer, {
//   cors: {
//     origin: ['https://foodsionmix.com', 'https://www.foodsionmix.com'],
//     methods: ['GET', 'POST'],
//     credentials: true
//   },
//   transports: ['websocket', 'polling'] // Asegura múltiples transportes
// });

// // // Agregar log para debugging
// // io.on('connection', (socket) => {
// //   console.log('🔌 Cliente conectado:', socket.id);

// //   socket.on('disconnect', () => {
// //     console.log('❌ Cliente desconectado:', socket.id);
// //   });
// // });

// io.on('connection', (socket) => {
//   console.log('🔌 Cliente conectado:', socket.id);

//   socket.on('new-order', (data) => {
//     console.log('📦 Nuevo pedido recibido:', data);
//     // Emitir a todos los clientes conectados
//     io.emit('notification', {
//       type: 'new-order',
//       title: 'Nuevo Pedido',
//       data: data.order,
//       timestamp: new Date()
//     });
//   });

//   socket.on('disconnect', () => {
//     console.log('❌ Cliente desconectado:', socket.id);
//   });
// });

// // Función helper para enviar notificaciones
// export const sendNotification = (type: string, title: string, data?: any) => {
//   io.emit('notification', {
//     type,
//     title,
//     data,
//     timestamp: new Date()
//   });
// };

// // --- Middlewares ---
// app.use(cors({
//   origin: '*',
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(bodyParser.json());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true })); 

// app.use(morgan('dev'));

// // --- Configuración de Multer ---
// const uploadDir = 'C:/reportes';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
// });

// const upload: RequestHandler = multer({ storage }).single('image'); // ✅ tipado correcto

// app.post('/upload', upload, (req: Request, res: Response) => {
//   if (!req.file) {
//     return res.status(400).send('No se subió ninguna imagen');
//   }
//   const filePath = `/uploads/${req.file.filename}`;
//   res.json({ filePath });
// });

// app.use('/uploads', express.static(uploadDir));

// // --- Rutas ---
// app.use(Aprovechamiento);
// app.use(loginRoutes);
// app.use(MarcacionRoutes);
// app.use(transaccion);
// app.use(protectedRoutes);
// app.use(orden);
// app.use(verifyToken);
// app.use(userRoutes);
// app.use(Empresas);
// app.use(Palitero);
// app.use(Quiebra);
// app.use(descuentoRoutes);
// app.use(gruposRoutes);
// app.use(LevelRoutes);
// app.use(horariosRoutes);
// app.use(salarioRoutes);
// app.use(horasExtrasRoutes);
// app.use(plus);
// app.use(metas);
// app.use(prodcutos);
// app.use(calandra);
// app.use(interfoliacion);
// app.use(clasificacion);
// app.use(caballete);
// app.use(pvb);
// app.use(graficos);
// app.use(prueba);
// app.use(autoClave);
// app.use(caballete);
// app.use(reporteDescarga);
// app.use(reporteLavadora);
// app.use(reporteSalaLimpia);
// app.use(reporteCalandra);
// app.use(reporteInterfoliacion);
// app.use(reporteStock);
// app.use(Productos);
// app.use(Proveedor);
// app.use(Clasificacion);
// app.use(OrdenProduccion);
// app.use(stock);
// app.use(pagos);
// app.use(Vehiculos);
// app.use(Cliente);
// app.use(EntradaNotaFiscal);
// app.use(SalaLimpia);
// app.use(Exportacion);
// app.use(PedidoVenta);
// app.use(Precio);
// app.use(cargadora);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // --- Celebrate errores ---
// app.use(celebrateErrors());

// // --- Middleware global de errores ---
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

// app.get("/pagopar/confirmacion/:hash", (req, res) => {
//   res.send("Gracias por tu compra. Hash recibido: " + req.params.hash);
// });

// // Modifica la exportación para incluir el httpServer
// export { app, httpServer };


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

// --- Configuración de Socket.io CORREGIDA ---
const io = new Server(httpServer, {
  cors: {
    origin: ['https://foodsionmix.com', 'https://www.foodsionmix.com', 'http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// --- Interfaces para TypeScript ---
interface NotificationData {
  type: string;
  title: string;
  data?: any;
  timestamp: Date;
}

interface OrderData {
  id?: string;
  comprobante?: string;
  total?: number;
  subtotal?: number;
  delivery_cost?: number;
  distance?: number;
  customer_info?: {
    name?: string;
    phone?: string;
    address?: string;
    documento?: string;
    razon_social?: string;
    email?: string;
  };
  items?: any[];
  order_type?: string;
  delivery_type?: string;
  status?: string;
  timestamp?: string;
  factura?: string;
}

interface SocketClient {
  id: string;
  connectedAt: number;
}

// --- Configuración MEJORADA de Socket.io ---
io.on('connection', (socket) => {
  console.log('🔌 Cliente conectado al servidor:', socket.id);

  // Escuchar eventos de nuevos pedidos (CORREGIDO: new_order en lugar de new-order)
  socket.on('new_order', (data: any) => {
    console.log('📦 NUEVO PEDIDO RECIBIDO EN BACKEND:', {
      tipo: data?.type,
      comprobante: data?.data?.comprobante,
      total: data?.data?.total,
      cliente: data?.data?.customer_info?.name
    });
    
    // Emitir a TODOS los clientes conectados (incluyendo admin) con el evento new_order
    io.emit('new_order', {
      type: 'new_order',
      data: data?.data || data,
      timestamp: new Date()
    });
    
    // También emitir como notification para compatibilidad
    io.emit('notification', {
      type: 'new_order',
      title: 'Nuevo Pedido Recibido',
      data: data?.data || data,
      timestamp: new Date()
    });

    console.log('✅ Notificaciones emitidas a todos los clientes conectados');
  });

  // Mantener compatibilidad con el evento antiguo por si acaso
  socket.on('new-order', (data: any) => {
    console.log('📦 NUEVO PEDIDO (evento legacy):', data);
    io.emit('new_order', {
      type: 'new_order',
      data: data?.order || data,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', (reason: string) => {
    console.log('❌ Cliente desconectado:', socket.id, 'Razón:', reason);
  });

  socket.on('error', (error: Error) => {
    console.error('💥 Error en socket:', error);
  });
});

// Función MEJORADA para enviar notificaciones
export const sendNotification = (type: string, title: string, data?: any): void => {
  console.log(`🔔 Enviando notificación: ${type}`, data);
  
  io.emit('notification', {
    type,
    title,
    data,
    timestamp: new Date()
  });
  
  // También emitir como new_order si es un pedido nuevo
  if (type === 'new_order') {
    io.emit('new_order', {
      type: 'new_order',
      data: data,
      timestamp: new Date()
    });
  }
};

// Función específica para nuevos pedidos
export const sendNewOrderNotification = (orderData: OrderData): void => {
  console.log('🔔 Enviando notificación de nuevo pedido:', orderData?.comprobante);
  
  io.emit('new_order', {
    type: 'new_order',
    data: orderData,
    timestamp: new Date()
  });
  
  io.emit('notification', {
    type: 'new_order',
    title: 'Nuevo Pedido',
    data: orderData,
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

const upload: RequestHandler = multer({ storage }).single('image');

app.post('/upload', upload, (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No se subió ninguna imagen');
  }
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ filePath });
});

app.use('/uploads', express.static(uploadDir));

// --- Endpoints de Diagnóstico MEJORADOS ---
app.get('/api/socket/status', (req: Request, res: Response) => {
  const clientsCount = io.engine.clientsCount;
  const clients: SocketClient[] = [];
  
  // Obtener información de clientes conectados (si es posible)
  io.of("/").sockets.forEach((socket) => {
    clients.push({
      id: socket.id,
      connectedAt: socket.handshake.issued
    });
  });

  res.json({
    status: 'ok',
    connectedClients: clientsCount,
    activeConnections: clients,
    timestamp: new Date().toISOString(),
    message: `Socket.io server running with ${clientsCount} connected clients`
  });
});

app.get('/api/debug/notifications', (req: Request, res: Response) => {
  res.json({
    socketEvents: ['new_order', 'notification', 'new-order (legacy)'],
    cors: {
      origin: ['https://foodsionmix.com', 'https://www.foodsionmix.com', 'http://localhost:3000', 'http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    },
    transports: ['websocket', 'polling'],
    endpoints: {
      status: '/api/socket/status',
      debug: '/api/debug/notifications'
    }
  });
});

// Endpoint para probar notificaciones manualmente
app.post('/api/test/notification', (req: Request, res: Response) => {
  const { comprobante, total, cliente } = req.body;
  
  const testOrder: OrderData = {
    id: `test-${Date.now()}`,
    comprobante: comprobante || `TEST-${Date.now()}`,
    total: total || 25000,
    subtotal: 20000,
    delivery_cost: 5000,
    distance: 2.5,
    customer_info: {
      name: cliente || 'Cliente de Prueba',
      phone: '+595123456789',
      address: 'Dirección de prueba',
      documento: '1234567',
      razon_social: 'Cliente Test'
    },
    items: [{ name: 'Producto Test', quantity: 1, price: 20000 }],
    order_type: 'test',
    delivery_type: 'delivery',
    status: 'pendiente',
    timestamp: new Date().toISOString(),
    factura: 'No'
  };

  console.log('🧪 Enviando notificación de prueba:', testOrder.comprobante);
  
  sendNewOrderNotification(testOrder);
  
  res.json({
    success: true,
    message: 'Notificación de prueba enviada',
    order: testOrder
  });
});

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

app.get("/pagopar/confirmacion/:hash", (req: Request, res: Response) => {
  res.send("Gracias por tu compra. Hash recibido: " + req.params.hash);
});

// Ruta de salud general
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Foodsion Backend API',
    timestamp: new Date().toISOString(),
    socket: {
      connectedClients: io.engine.clientsCount,
      active: true
    }
  });
});

// Modifica la exportación para incluir el httpServer
export { app, httpServer, io };