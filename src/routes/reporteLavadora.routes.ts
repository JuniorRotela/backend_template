import { Router } from "express";
// import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
// import { createMarcacion } from "../controllers/marcacion.controllers";
// import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
// import { descuentoValidate } from "../validators/descuento.validation";
// import { updateHorasExtras } from "../controllers/horasExtras.controllers";
import { createReporteLavadora, getOneReporteLavadora, getProblemaLavadora, getReportelavadora, getReporteLavadora, getVista_lavadora_SL  } from "../controllers/reporteLavadora.controllers";
import { reporteLavadoraValidate } from "../validators/reporteLavadora.validation";

const router = Router()
router.post("/reporteLavadora",reporteLavadoraValidate, createReporteLavadora);
router.get("/problemaLavadora", getProblemaLavadora);
router.get("/reporteLavadora", getReporteLavadora);
router.get("/vistalavadora", getReportelavadora);
router.get("/reporteLavadora/:id", getOneReporteLavadora);
router.get("/vistaLavadoraSL", getVista_lavadora_SL);
// router.get("/horasExtras/horasExtrasView/:id", getOneHorasExtras);
// router.put("/horasExtras/:id", updateHorasExtras);
// // router.delete("/garden/:id", deleteGarden);


export default router;