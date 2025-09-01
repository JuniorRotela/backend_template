import { Router } from "express";
import { createPrecio, getPrecio, getOnePrecio, updatePrecio, getPrecioProducto } from "../controllers/precio.controllers";
import { precioValidate } from "../validators/precio.validation";


const router = Router()
router.post("/precio", createPrecio);
router.get("/precio", getPrecio);
router.get("/listaPrecio", getPrecio);
router.get("/precioProducto/:pais/:producto", getPrecioProducto);
router.get("/precio/:id", getOnePrecio);
router.put("/precio/:id", precioValidate, updatePrecio);



export default router;