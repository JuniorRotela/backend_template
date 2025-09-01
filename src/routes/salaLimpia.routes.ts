import { Router } from "express";
import { getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
import { descuentoValidate } from "../validators/descuento.validation";
import { createSala, getHistorialTemperaruta, getRegistroFinal, getSala } from "../controllers/salaLimpia.controllers";
import { salaValidate } from "../validators/salaLimpia.validation";


const router = Router()
router.post("/salaLimpia",salaValidate, createSala);
router.post("/salaLimpia/fecha", getSala);
router.get("/ultimoRegistroSalaLimpia", getRegistroFinal);
router.get("/historialChapa", getHistorialTemperaruta);
router.put("/descuento/:id", descuentoValidate, updateDescuento);
// router.delete("/garden/:id", deleteGarden);


export default router;