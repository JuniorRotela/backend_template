import { Router } from "express";
import { createMeta, getMetas, getMetasView } from "../controllers/metas.controllers";
import { createInterfoliacion, getIdColar, getInterfoliacion,updateInterfoliacion, getInterfoliacionColar, getOneIdProduccion, getOneSerie, getOneSerieImpresion, getOneTicket, getOneSerieInterfoliacion, getReprintColar, getOneColar } from "../controllers/interfoliacion.controllers";
import { interfoliacionValidate } from "../validators/interfoliacion.validation";


const router = Router()
router.post("/interfoliacion",interfoliacionValidate, createInterfoliacion);
router.get("/interfoliacion", getInterfoliacion);
router.get("/interfoliacion/idColar", getIdColar);
router.get("/interfoliacion/reprintColar", getReprintColar);
router.get("/interfoliacion/viewColar", getInterfoliacionColar);
router.get("/metas/metasView", getMetasView);
router.get("/calandraId", getOneIdProduccion);
router.get("/getOneSerie/:serie", getOneSerie);
router.get("/getOneColar/:serie", getOneColar);
router.get("/getOneSerieInterfoliacion/:serie", getOneSerieInterfoliacion);
router.get("/getOneSerieImpresion/:serie", getOneSerieImpresion);
router.get("/interfoliacion/:id", getOneTicket);
router.put("/desactivar/:id", updateInterfoliacion);
// router.delete("/garden/:id", deleteGarden);


export default router;