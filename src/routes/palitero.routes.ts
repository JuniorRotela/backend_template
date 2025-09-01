import { Router } from "express";
import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
import { createMarcacion } from "../controllers/marcacion.controllers";
import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
import { descuentoValidate } from "../validators/descuento.validation";
// import { createHoras, getHorasExtras } from "../controllers/horasExtras.controllers";
// import { horasExtrasValidate } from "../validators/descuento.validation copy";
// import { createPlus, getPlus } from "../controllers/plus.controllers";
// import { plusValidate } from "../validators/plus.validation";
import { createMeta, getMetas, getMetasView } from "../controllers/metas.controllers";
import { metasValidate } from "../validators/metas.validation";
import { createProducto } from "../controllers/productos.controllers";
import { productosValidate } from "../validators/productos.validation";
import { createInterfoliacion, getIdColar, getInterfoliacion, getInterfoliacionColar, getOneIdProduccion, getOneSerie, getOneSerieImpresion, getOneTicket } from "../controllers/interfoliacion.controllers";
import { interfoliacionValidate } from "../validators/interfoliacion.validation";
import { getIdColarPalitero, getIdColarReprint, getPalitero, getPaliteroCab } from "../controllers/palitero.controllers";


const router = Router()

router.get("/palitero/viewPalitero/:id", getPalitero);
router.get("/palitero/getPaliteroCab", getPaliteroCab);
router.get("/palitero/idColar/:id", getIdColarPalitero);
router.get("/palitero/idColarRep/:id", getIdColarReprint);
export default router;