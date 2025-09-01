import { Router } from "express";
import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
import { createMarcacion } from "../controllers/marcacion.controllers";
import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
import { descuentoValidate } from "../validators/descuento.validation";
import { createHoras, getHorasExtras } from "../controllers/horasExtras.controllers";
// import { horasExtrasValidate } from "../validators/descuento.validation copy";
import { createPlus, getPlus } from "../controllers/plus.controllers";
import { plusValidate } from "../validators/plus.validation";
import { createMeta, getMetas, getMetasView } from "../controllers/metas.controllers";
import { metasValidate } from "../validators/metas.validation";
import { createProducto } from "../controllers/productos.controllers";
import { productosValidate } from "../validators/productos.validation";
import { createCalandra, getCalandra } from "../controllers/calandra.controllers";
import { getCategorias, getClasificacion } from "../controllers/clasificacion.controllers";

const router = Router()
router.post("/calandra",productosValidate, createCalandra);
router.get("/clasificacion", getClasificacion);
router.get("/categorias", getCategorias);
router.get("/metas/metasView", getMetasView);
router.get("/descuento/:id", getOneDescuento);
router.put("/descuento/:id", descuentoValidate, updateDescuento);
// router.delete("/garden/:id", deleteGarden);


export default router;