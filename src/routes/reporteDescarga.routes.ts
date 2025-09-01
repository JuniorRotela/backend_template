import { Router } from "express";
// import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
// import { createMarcacion } from "../controllers/marcacion.controllers";
// import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
// import { descuentoValidate } from "../validators/descuento.validation";
// import { updateHorasExtras } from "../controllers/horasExtras.controllers";
import { createReporteDescarga, getProblemaDescarga, getReporteDescarga, getReportedescarga } from "../controllers/reporteDescarga.controllers";
import { reporteDescargaValidate } from "../validators/reporteDescarga.validation";

const router = Router()
router.post("/reporteDescarga",reporteDescargaValidate, createReporteDescarga);
router.get("/problemaDescarga", getProblemaDescarga);
router.get("/reporteDescarga", getReporteDescarga);
router.get("/vistadescarga", getReportedescarga);
// router.get("/horasExtras/horasExtrasView/:id", getOneHorasExtras);
// router.put("/horasExtras/:id", updateHorasExtras);
// // router.delete("/garden/:id", deleteGarden);


export default router;