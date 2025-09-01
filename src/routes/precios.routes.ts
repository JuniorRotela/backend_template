import { Router } from "express";
import { createPrecios, getPrecios, getOnePrecios, updatePrecios } from "../controllers/precios.controllers";
import { preciosValidate } from "../validators/precios.validation";

const router = Router()
router.post("/precios",preciosValidate, createPrecios);
router.get("/precios", getPrecios);
// router.get("/garden/viewActivity", getActivity);
router.get("/precios/:id", getOnePrecios);
router.put("/precios/:id", preciosValidate, updatePrecios);
// router.delete("/garden/:id", deleteGarden);


export default router;