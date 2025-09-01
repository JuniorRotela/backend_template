import { Router } from "express";
// import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
// import { createMarcacion } from "../controllers/marcacion.controllers";
// import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
// import { descuentoValidate } from "../validators/descuento.validation";
// import { updateHorasExtras } from "../controllers/horasExtras.controllers";
import { createReporteSalaLimpia, getProblemaSalaLimpia, getReportesalalimpia, getReporteSalaLimpia, updateReporteSalaLimpia  } from "../controllers/reporteSalaLimpia.controllers";
import { reporteSalaLimpiaValidate } from "../validators/reporteSalaLimpia.validation";
// import { updateProblema } from "../services/reporteSalaLimpia/update.services";

const router = Router()
router.post("/reporteSalaLimpia",reporteSalaLimpiaValidate, createReporteSalaLimpia);
router.get("/problemaSalaLimpia", getProblemaSalaLimpia);
router.get("/reporteSalaLimpia", getReporteSalaLimpia);
router.get("/vistasalalimpia", getReportesalalimpia);
// router.get("/horasExtras/horasExtrasView/:id", getOneHorasExtras);
router.put("/rpsalalimpia/:id", updateReporteSalaLimpia);
// // router.delete("/garden/:id", deleteGarden);



export default router;
