import { Router } from "express";
// import { createGarden, deleteGarden, getActivity, getGarden, getOneGarden, updateGarden } from "../controllers/garden.controllers";
import { createLevel, getOneLevel, getLevel } from "../controllers/level.controllers";
import { levelValidate } from "../validators/level.validation";
import { createEmpresas, getEmpresas } from "../controllers/empresas.controllers";
import { empresasValidate } from "../validators/empresas.validation";
import { createQuiebra, createQuiebraInt, getOneImagenR, getOneRetallo, getOneTicketRetallo, getQuiebra, getQuiebraInt, getQuiebraView } from "../controllers/quiebra.controllers";
import { quiebraValidate } from "../validators/quiebra.validation";
import { quiebraIntValidate } from "../validators/quiebraInt.validation";
import { getOneStock } from "../controllers/quiebra.controllers";


const router = Router()
router.post("/quiebra", quiebraValidate, createQuiebra);
router.post("/quiebraInt", quiebraIntValidate, createQuiebraInt);
router.get("/quiebra", getQuiebra);
router.get("/quiebra/view", getQuiebraView);
router.get("/quiebraInt/", getQuiebraInt);

// router.get("/garden/viewActivity", getActivity);
router.get("/quiebra/getone/:serie", getOneStock);
router.get("/quiebra/getoneTicket/:id", getOneTicketRetallo);
router.get("/quiebra/getoneRetallo/:id", getOneRetallo);
router.get("/quiebra/getoneImagen/:id", getOneImagenR);


// router.put("/garden/:id", updateGarden);
// router.delete("/garden/:id", deleteGarden);


export default router;