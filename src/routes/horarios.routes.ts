import { Router } from "express";
import { createGrupos, getGrupos, getOneGrupos, updateGrupos } from "../controllers/grupos.controllers";
import { gruposValidate } from "../validators/grupos.validation";
import { horariosValidate } from "../validators/horarios.validation";
import { createHorarios, getHorarios, updateHorarios, getOneHorarios } from "../controllers/horarios.controllers";

const router = Router()
router.post("/horarios",horariosValidate, createHorarios);
router.get("/horarios", getHorarios);
// router.get("/garden/viewActivity", getActivity);
router.get("/horarios/:id", getOneHorarios);
router.put("/horarios/:id", horariosValidate, updateHorarios);
// router.delete("/garden/:id", deleteGarden);


export default router;