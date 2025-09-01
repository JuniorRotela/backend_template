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
import { createCalandra, createCalandra2, getCalandra, getOneIdProduccion, getOneTicket, updateCalandra } from "../controllers/calandra.controllers";
import { calandraValidate } from "../validators/calandra.validation";
import { calandraTrueValidate } from "../validators/calandraTrue.validation";

const router = Router()
router.post("/calandra",calandraValidate, createCalandra);
router.post("/calandraTrue",calandraTrueValidate, createCalandra2);
router.get("/calandra", getCalandra);
router.get("/metas/metasView", getMetasView);
router.get("/calandraId", getOneIdProduccion);
router.get("/calandra/:id", getOneTicket);
router.put("/calandra/:id", updateCalandra);
// router.delete("/garden/:id", deleteGarden);


export default router;