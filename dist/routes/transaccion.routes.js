"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaccion_controllers_1 = require("../controllers/transaccion.controllers");
const router = (0, express_1.Router)();
router.post("/transaccion", transaccion_controllers_1.createTransaccion);
router.post("/pagopar/notificacion", transaccion_controllers_1.recibirNotificacionPagopar);
router.post("/pagopar/resultado", transaccion_controllers_1.recibirResultadoPagopar);
exports.default = router;
