import { Router } from "express";
// import { createGarden, deleteGarden, getActivity, getGarden, getOneGarden, updateGarden } from "../controllers/garden.controllers";
import { createLevel, getOneLevel, getLevel } from "../controllers/level.controllers";
import { levelValidate } from "../validators/level.validation";
import { createEmpresas, getEmpresas } from "../controllers/empresas.controllers";
import { empresasValidate } from "../validators/empresas.validation";

const router = Router()
router.post("/empresas", empresasValidate, createEmpresas);
router.get("/empresas", getEmpresas);
// router.get("/garden/viewActivity", getActivity);
router.get("/level/:id", getOneLevel);
// router.put("/garden/:id", updateGarden);
// router.delete("/garden/:id", deleteGarden);


export default router;