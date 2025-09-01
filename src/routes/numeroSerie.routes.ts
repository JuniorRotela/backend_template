import { Router } from "express";
import { createGrupos, getGrupos, getOneGrupos, updateGrupos } from "../controllers/grupos.controllers";
import { gruposValidate } from "../validators/grupos.validation";


const router = Router()
router.post("/grupos", createGrupos);
router.get("/grupos", getGrupos);
// router.get("/garden/viewActivity", getActivity);
router.get("/grupos/:id", getOneGrupos);
router.put("/grupos/:id", gruposValidate, updateGrupos);
// router.delete("/garden/:id", deleteGarden);


export default router;