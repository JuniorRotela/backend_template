import { Router } from "express";
import { createProducto, getProductos, getOneProducto, getCategorias, getProductoProveedor } from "../controllers/productos.controllers";
import { productosValidate } from "../validators/productos.validation";

const router = Router()
router.post("/productos",productosValidate, createProducto);
router.get("/productos", getProductos);
router.get("/categorias", getCategorias);
// router.get("/metas/metasView", getMetasView);
router.get("/productos/:id", getOneProducto);
router.get("/productoProveedor/:id/:id_categoria", getProductoProveedor);
// router.put("/descuento/:id", descuentoValidate, updateDescuento);
// router.delete("/garden/:id", deleteGarden);

export default router;