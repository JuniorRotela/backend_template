import { Router } from "express";
import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
import { createMarcacion } from "../controllers/marcacion.controllers";
import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
import { descuentoValidate } from "../validators/descuento.validation";
import { updateHorasExtras } from "../controllers/horasExtras.controllers";
import { createHoras, getHorasExtras, getOneHorasExtras } from "../controllers/horasExtras.controllers";
import { horasExtrasValidate } from "../validators/horasExtras.validation";

const router = Router()
router.post("/horasExtras",horasExtrasValidate, createHoras);
// router.get("/horasExtras", getHorasExtras);
router.get("/horasExtras/horasExtrasView", getHorasExtras);
router.get("/horasExtras/horasExtrasView/:id", getOneHorasExtras);
router.put("/horasExtras/:id", updateHorasExtras);
// router.delete("/garden/:id", deleteGarden);


export default router;