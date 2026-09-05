import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';
import bodyParser from 'body-parser';

// --- Import de rutas (Foodsion) ---
import loginRoutes from './routes/login.routes';
import transaccion from './routes/transaccion.routes';
import orden from './routes/orden.routes';
import stock from './routes/stock.routes';

// --- Inicialización de Express ---
const app = express();
const httpServer = createServer(app);

// --- Configuración de Socket.io ---
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

// --- Eventos de Socket.io ---
io.on('connection', (socket) => {
  console.log('🔌 Cliente conectado al servidor:', socket.id);

  // Evento principal de nuevos pedidos
  socket.on('new_order', (data: any) => {
    console.log('📦 NUEVO PEDIDO RECIBIDO EN BACKEND:', {
      tipo: data?.type,
      comprobante: data?.data?.comprobante,
      total: data?.data?.total,
      cliente: data?.data?.customer_info?.name
    });

    io.emit('new_order', {
      type: 'new_order',
      data: data?.data || data,
      timestamp: new Date()
    });

    io.emit('notification', {
      type: 'new_order',
      title: 'Nuevo Pedido Recibido',
      data: data?.data || data,
      timestamp: new Date()
    });

    console.log('✅ Notificaciones emitidas a todos los clientes conectados');
  });

  // Compatibilidad con el evento legacy
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

// Función para enviar notificaciones
export const sendNotification = (type: string, title: string, data?: any): void => {
  console.log(`🔔 Enviando notificación: ${type}`, data);

  io.emit('notification', {
    type,
    title,
    data,
    timestamp: new Date()
  });

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

// --- Rutas ---
app.use(loginRoutes);
app.use(transaccion);
app.use(orden);
app.use(stock);

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

// Exporta la app con el httpServer
export { app, httpServer, io };