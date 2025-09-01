import { Router } from "express";
import { createUser, getOneUser, getUsers } from "../controllers/user.controllers";
import { createMarcacion } from "../controllers/marcacion.controllers";
import { createSalarios, getSalarios, getOneSalarios, updateSalarios } from "../controllers/salario.controllers";

import { createPago, getAguinaldoIpsView, getAguinaldoRealView, getPagos } from "../controllers/pagoSalarios.controllers";
import { PagosValidate } from "../validators/pagoSalario.validation";


const router = Router()
router.post("/pagosSalario",PagosValidate, createPago);
router.get("/pagos/pagosView", getPagos);
router.get("/aginaldo/aguinaldoIpsView", getAguinaldoIpsView);
router.get("/aginaldo/aguinaldoRealView", getAguinaldoRealView);
router.get("/salarios/:id", getOneSalarios);
// router.put("/salarios/:id", PagosValidate, updateSalarios);
// router.delete("/garden/:id", deleteGarden);


export default router;