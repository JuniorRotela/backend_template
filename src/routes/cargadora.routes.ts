import { Router } from "express";
// import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
// import { createMarcacion } from "../controllers/marcacion.controllers";
// import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
// import { descuentoValidate } from "../validators/descuento.validation";
// import { updateHorasExtras } from "../controllers/horasExtras.controllers";
import { createReporteCalandra, getMotivoCalandra, getOnePaqueteCargadoraxdxd, getOneProblemaCalandra, getOneSerie, getProblemaCalandra, getReportecalandra, getReporteCalandra, updateReporteCalandra  } from "../controllers/reporteCalandra.controllers";
import { reporteCalandraValidate } from "../validators/reporteCalandra.validation";
import { getOrdenProduccionView } from "../controllers/cargadora.controllers";
import getOnePaquete from "../services/cargadora/getOne.services";

const router = Router()
router.post("/reporteCalandra",reporteCalandraValidate, createReporteCalandra);
router.get("/cargadora", getOrdenProduccionView);

router.get("/problemaCalandra/:id", getOneProblemaCalandra);
router.get("/cargadoraCabSerie/:id", getOnePaqueteCargadoraxdxd);
router.get("/reporteCalandra", getReporteCalandra);
router.get("/vistacalandra", getReportecalandra);
router.get("/getOneSerie/:serie", getOneSerie);
router.get("/motivoCalandra", getMotivoCalandra);
// router.get("/horasExtras/horasExtrasView/:id", getOneHorasExtras);
router.put("/rpCalandra/:id", updateReporteCalandra);
// // router.delete("/garden/:id", deleteGarden);


export default router;