"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.httpServer = exports.app = exports.sendNewOrderNotification = exports.sendNotification = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const celebrate_1 = require("celebrate");
const body_parser_1 = __importDefault(require("body-parser"));
// --- Import de rutas (Foodsion) ---
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const transaccion_routes_1 = __importDefault(require("./routes/transaccion.routes"));
const orden_routes_1 = __importDefault(require("./routes/orden.routes"));
const stock_routes_1 = __importDefault(require("./routes/stock.routes"));
// --- Inicialización de Express ---
const app = (0, express_1.default)();
exports.app = app;
const httpServer = (0, http_1.createServer)(app);
exports.httpServer = httpServer;
// --- Configuración de Socket.io ---
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ['https://foodsionmix.com', 'https://www.foodsionmix.com', 'http://localhost:3000', 'http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    },
    transports: ['websocket', 'polling']
});
exports.io = io;
// --- Eventos de Socket.io ---
io.on('connection', (socket) => {
    console.log('🔌 Cliente conectado al servidor:', socket.id);
    // Evento principal de nuevos pedidos
    socket.on('new_order', (data) => {
        var _a, _b, _c, _d;
        console.log('📦 NUEVO PEDIDO RECIBIDO EN BACKEND:', {
            tipo: data === null || data === void 0 ? void 0 : data.type,
            comprobante: (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.comprobante,
            total: (_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.total,
            cliente: (_d = (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.customer_info) === null || _d === void 0 ? void 0 : _d.name
        });
        io.emit('new_order', {
            type: 'new_order',
            data: (data === null || data === void 0 ? void 0 : data.data) || data,
            timestamp: new Date()
        });
        io.emit('notification', {
            type: 'new_order',
            title: 'Nuevo Pedido Recibido',
            data: (data === null || data === void 0 ? void 0 : data.data) || data,
            timestamp: new Date()
        });
        console.log('✅ Notificaciones emitidas a todos los clientes conectados');
    });
    // Compatibilidad con el evento legacy
    socket.on('new-order', (data) => {
        console.log('📦 NUEVO PEDIDO (evento legacy):', data);
        io.emit('new_order', {
            type: 'new_order',
            data: (data === null || data === void 0 ? void 0 : data.order) || data,
            timestamp: new Date()
        });
    });
    socket.on('disconnect', (reason) => {
        console.log('❌ Cliente desconectado:', socket.id, 'Razón:', reason);
    });
    socket.on('error', (error) => {
        console.error('💥 Error en socket:', error);
    });
});
// Función para enviar notificaciones
const sendNotification = (type, title, data) => {
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
exports.sendNotification = sendNotification;
// Función específica para nuevos pedidos
const sendNewOrderNotification = (orderData) => {
    console.log('🔔 Enviando notificación de nuevo pedido:', orderData === null || orderData === void 0 ? void 0 : orderData.comprobante);
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
exports.sendNewOrderNotification = sendNewOrderNotification;
// --- Middlewares ---
app.use((0, cors_1.default)({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(body_parser_1.default.json());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use((0, morgan_1.default)('dev'));
// --- Rutas ---
app.use(login_routes_1.default);
app.use(transaccion_routes_1.default);
app.use(orden_routes_1.default);
app.use(stock_routes_1.default);
// --- Celebrate errores ---
app.use((0, celebrate_1.errors)());
// --- Middleware global de errores ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
app.get("/pagopar/confirmacion/:hash", (req, res) => {
    res.send("Gracias por tu compra. Hash recibido: " + req.params.hash);
});
// Ruta de salud general
app.get('/api/health', (req, res) => {
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
