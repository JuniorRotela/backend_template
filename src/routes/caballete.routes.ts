import { Router } from "express";
import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
import { createMarcacion } from "../controllers/marcacion.controllers";
import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
import { descuentoValidate } from "../validators/descuento.validation";
import { createHoras, getHorasExtras } from "../controllers/horasExtras.controllers";
// import { horasExtrasValidate } from "../validators/descuento.validation copy";

import { caballeteValidate } from "../validators/caballete.validation";
import { createCaballete, getCaballete, getCaballeteView, getCaballeteView2, getChapasCaballete, getOneCaballete, updateCaballete, updateChapas, updateChapasOrd } from "../controllers/caballete.controllers";


const router = Router()
router.post("/caballete",caballeteValidate, createCaballete);
router.get("/caballete", getCaballete);
router.get("/caballeteView", getCaballeteView);
router.get("/caballeteView2", getCaballeteView2);
router.get("/caballete/:id", getOneCaballete);
router.get("/caballeteChapas/:id", getChapasCaballete);
router.put("/updateChapas/:id", updateChapas);
router.put("/updateEstado/:id", updateCaballete);
router.put("/updateChapaOrde/:id", updateChapasOrd);
// router.delete("/garden/:id", deleteGarden);

export default router;