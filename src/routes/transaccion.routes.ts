import { Router } from "express";
import { createAprovechamiento } from "../controllers/aprovechamiento.controllers";
import { aprovechamientoValidate } from "../validators/aprovechamiento.validation";
import { createTransaccion, recibirNotificacionPagopar, recibirResultadoPagopar } from "../controllers/transaccion.controllers";

const router = Router()
router.post("/transaccion", createTransaccion);
router.post("/pagopar/notificacion", recibirNotificacionPagopar);
router.post("/pagopar/resultado", recibirResultadoPagopar);





export default router;