import { Router } from "express";

import { pedidoVentaValidate } from "../validators/pedidoVenta.validation";
import { createCargaPedido, createPedidoVenta, getOneNPedido, getCargamento, getHistorialVenta, getLiberarCamion, getOneCargaPedido, getOneCargaPedidoHistorial, getOneChapas, getOneChapasHistorial, getOnePedidoVenta, getPedidoVenta, getPedidoVentaLiberar, getProductoInterfoliacion, updateCamiones, updatePedido, updateSalidaStock, updateVentaStock, updatePedidoLiberacion } from "../controllers/pedidoVenta.controllers";
import { cargaPedidoValidate } from "../validators/cargaPedido.validation";
// import getOneChapa from "../services/pedidoVenta/getOneChapas.services";


const router = Router()
router.post("/pedidoVenta",pedidoVentaValidate, createPedidoVenta);
router.post("/cargaPedido",cargaPedidoValidate, createCargaPedido);
router.get("/pedidoVenta", getPedidoVenta);
router.get("/pedidoVenta/historial", getHistorialVenta);
router.get("/liberarCamiones", getLiberarCamion);
router.get("/pedidoVentaLiberar", getPedidoVentaLiberar);
router.get("/cargamento", getCargamento);
router.get("/pedidoVenta/:id", getOnePedidoVenta);
router.get("/Pedido/:id", getOneNPedido);
router.get("/camionChapas/:id", getOneChapas);
router.get("/camionChapas/historial/:id", getOneChapasHistorial);
router.get("/productoInterfoliacion/:colar/:serie", getProductoInterfoliacion);
router.get("/camionCarga/:chapa", getOneCargaPedido);
router.get("/camionCargaHistorial/:chapa", getOneCargaPedidoHistorial);
router.put("/pedidoVenta/:id", updatePedido);
router.put("/pedidoVentaLiberacion/:id", updatePedidoLiberacion);
router.put("/camiones/:id", updateCamiones);
router.put("/ventaStock/:id", updateVentaStock);
router.put("/salidaStock/:id", updateSalidaStock);
// router.delete("/garden/:id", deleteGarden);

export default router; 