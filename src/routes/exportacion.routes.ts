import { Router } from "express";
import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
import { createMarcacion } from "../controllers/marcacion.controllers";
import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
import { descuentoValidate } from "../validators/descuento.validation";
import { createHoras, getHorasExtras } from "../controllers/horasExtras.controllers";
// import { horasExtrasValidate } from "../validators/descuento.validation copy";

import { caballeteValidate } from "../validators/caballete.validation";
import { createCaballete, getCaballete, getOneCaballete } from "../controllers/caballete.controllers";
import { getExportacion } from "../controllers/exportacion.controllers";


const router = Router()
router.post("/facturacion",caballeteValidate, createCaballete);
router.get("/exportacion", getExportacion);
router.get("/caballete/:id", getOneCaballete);
router.put("/descuento/:id", descuentoValidate, updateDescuento);
// router.delete("/garden/:id", deleteGarden);

export default router;