import { Router } from "express";
// import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
// import { createMarcacion } from "../controllers/marcacion.controllers";
// import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
// import { descuentoValidate } from "../validators/descuento.validation";
// import { updateHorasExtras } from "../controllers/horasExtras.controllers";
import { createReporteStock, getOneReporteStock, getOneStock, getProblemaStock, getReportestock, getReporteStock, sendGmailStock } from "../controllers/reporteStock.controllers";
import { reporteStockValidate } from "../validators/reporteStock.validation";

const router = Router()
router.post("/reporteStock",reporteStockValidate, createReporteStock);
router.post("/sendGmail", sendGmailStock);
router.get("/problemaStock", getProblemaStock);
router.get("/reporteStock", getReporteStock);
router.get("/vistaStock", getReportestock);
// router.get("/reporteStock/:id", getOneStock);
router.get("/reporteStock/:serie", getOneReporteStock);
// router.put("/horasExtras/:id", updateHorasExtras);


export default router;