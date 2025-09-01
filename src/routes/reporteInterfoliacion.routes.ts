import { Router } from "express";
// import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
// import { createMarcacion } from "../controllers/marcacion.controllers";
// import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
// import { descuentoValidate } from "../validators/descuento.validation";
// import { updateHorasExtras } from "../controllers/horasExtras.controllers";
import { createReporteInterfoliacion, getOneProblemaCalandra, getOneSerie, getProblemaCalandra, getReporte, getReporteInterfoliacion, getReporteinterfoliacionv  } from "../controllers/reporteInterfoliacion.controllers";
import { reporteInterfoliacionValidate } from "../validators/reporteInterfoliacion.validation";

const router = Router()
router.post("/reporteInterfoliacion",reporteInterfoliacionValidate, createReporteInterfoliacion);
router.get("/problemaCalandra", getProblemaCalandra);
router.get("/problemaCalandra/:id", getOneProblemaCalandra);
router.post("/reporteInterfoliacion/fecha", getReporteInterfoliacion);
router.get("/reporte", getReporte);
router.get("/vistainterfoliacion", getReporteinterfoliacionv);
router.get("/getOneSerie/:serie", getOneSerie);

// router.get("/horasExtras/horasExtrasView/:id", getOneHorasExtras);
// router.put("/horasExtras/:id", updateHorasExtras);
// // router.delete("/garden/:id", deleteGarden);


export default router;