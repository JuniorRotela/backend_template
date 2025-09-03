import { Router } from "express";
import { createAprovechamiento } from "../controllers/aprovechamiento.controllers";
import { aprovechamientoValidate } from "../validators/aprovechamiento.validation";
import { createTransaccion } from "../controllers/transaccion.controllers";

const router = Router()
router.post("/transaccion", createTransaccion);



export default router;