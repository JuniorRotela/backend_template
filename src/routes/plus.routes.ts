import { Router } from "express";
import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
import { createMarcacion } from "../controllers/marcacion.controllers";
import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
import { descuentoValidate } from "../validators/descuento.validation";
import { createHoras, getHorasExtras } from "../controllers/horasExtras.controllers";
import { horasExtrasValidate } from "../validators/horasExtras.validation";
import { createPlus, getPlus } from "../controllers/plus.controllers";
import { plusValidate } from "../validators/plus.validation";

const router = Router()
router.post("/plus",plusValidate, createPlus);
router.get("/plus", getPlus);
// router.get("/horasExtras/horasExtrasView", getHorasExtras);
router.get("/descuento/:id", getOneDescuento);
router.put("/descuento/:id", descuentoValidate, updateDescuento);
// router.delete("/garden/:id", deleteGarden);


export default router;