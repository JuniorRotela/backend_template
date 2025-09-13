import { Router } from "express";
import { createAprovechamiento } from "../controllers/aprovechamiento.controllers";
import { aprovechamientoValidate } from "../validators/aprovechamiento.validation";
import { createTransaccion, recibirNotificacionPagopar, recibirResultadoPagopar } from "../controllers/transaccion.controllers";
import { createOrden } from "../controllers/orden.controllers";

const router = Router()
router.post("/orden", createOrden);






export default router;