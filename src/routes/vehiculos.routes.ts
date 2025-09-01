import { Router } from "express";
import { getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
import { descuentoValidate } from "../validators/descuento.validation";

import { truckValidate } from "../validators/truck.validation";
import { createTruck, getOneTruck, getTruck } from "../controllers/truck.controllers";
// import { getCategorias, getClasificacion } from "../controllers/clasificacion.controllers";

const router = Router()
router.post("/truck",truckValidate, createTruck);
router.get("/truck", getTruck);
// router.get("/categorias", getCategorias);
router.get("/truck/:id", getOneTruck);
router.put("/descuento/:id", descuentoValidate, updateDescuento);
// router.delete("/garden/:id", deleteGarden);


export default router;