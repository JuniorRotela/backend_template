import { Router } from "express";

import { getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
import { descuentoValidate } from "../validators/descuento.validation";

import { clienteValidate } from "../validators/cliente.validation";
import { createCliente, getCliente } from "../controllers/cliente.controllers";


const router = Router()
router.post("/cliente",clienteValidate, createCliente);
router.get("/cliente", getCliente);
router.get("/descuento/:id", getOneDescuento);
router.put("/descuento/:id", descuentoValidate, updateDescuento);
// router.delete("/garden/:id", deleteGarden);


export default router;