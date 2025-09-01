import { Router } from "express";
import { createAutoClave, getAutoClave,getAutoClaveHistorial, getAutoClaveLog, getAutoClaveLogDes, getLastRecipe, postLogAutobyClave, getOneAutoClave, getOneProceso, updateAutoClave } from "../controllers/autoClave.controllers";
import { autoClaveValidate } from "../validators/autoClave.validation";
import { recetaValidate } from "../validators/receta.validation";
import { createReceta, getReceta } from "../controllers/receta.controllers";

const router = Router()
router.post("/autoClave",autoClaveValidate, createAutoClave);
router.post("/receta",recetaValidate, createReceta);
router.get("/autoClave", getAutoClave);
router.get("/autoClaveHistorial", getAutoClaveHistorial);
router.get("/autoClaveLog", getAutoClaveLog);
router.get("/autoClaveLogDesc", getAutoClaveLogDes);
router.get("/receta", getReceta);
router.get("/lastRecipe", getLastRecipe);
router.get("/autoClave/:id", getOneAutoClave);
router.get("/autoClaveProceso/:id", getOneProceso);
router.get("/getLog", getOneProceso);
router.post("/logAutoclave", postLogAutobyClave);
// router.get("/horasExtras/horasExtrasView/:id", getOneHorasExtras);
router.put("/updateAutoClave/:id", updateAutoClave);
// // router.delete("/garden/:id", deleteGarden);


export default router;
