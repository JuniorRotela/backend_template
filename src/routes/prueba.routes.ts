import { Router } from "express";
import { createPrueba, getPrueba, getOnePrueba, updatePrueba, getPruebaview } from "../controllers/prueba.controllers";
import { pruebaValidate } from "../validators/prueba.validation";

const router = Router()
router.post("/prueba",pruebaValidate, createPrueba);
router.get("/prueba", getPrueba);
router.get("/pruebaview", getPruebaview);
// router.get("/garden/viewActivity", getActivity);
router.get("/prueba/:id", getOnePrueba);
router.put("/prueba/:id", pruebaValidate, updatePrueba);
// router.delete("/garden/:id", deleteGarden);


export default router;