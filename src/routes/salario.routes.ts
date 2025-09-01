import { Router } from "express";
import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
import { createMarcacion } from "../controllers/marcacion.controllers";
import { createSalarios, getSalarios, getOneSalarios, updateSalarios } from "../controllers/salario.controllers";
import { salarioValidate } from "../validators/salario.validation";


const router = Router()
router.post("/salarios",salarioValidate, createSalarios);
router.get("/salarios", getSalarios);
// router.get("/garden/viewActivity", getActivity);
router.get("/salarios/:id", getOneSalarios);
router.put("/salarios/:id", salarioValidate, updateSalarios);
// router.delete("/garden/:id", deleteGarden);


export default router;