import { Router } from "express";
// import { createDescuento, getDescuentos, getDescuentosView, getOneDescuento, updateDescuento } from "../controllers/descuento.controllers";
// import { descuentoValidate } from "../validators/descuento.validation";
import { createMeta, getMetas, getMetasView } from "../controllers/metas.controllers";
import {  getStock, getOneIdProduccion, getOneTicket, getStockview, getOneSerie, updateStock, getStockLiberar, updateEntradaSalidaInventario, getStockV, getCodInterno, transferenciaEmpresa, updateIntermedio, getTranslado, DescontarStock, getNotaFiscalView, getStockLaminados, UpdateForNote, createStock, getStockCOINVERTIR  } from "../controllers/stock.controllers";
import { stockValidate } from "../validators/stock.validation";

const router = Router()
router.post("/stock", stockValidate, createStock);
router.get("/stock", getStock);
router.get("/stockv", getStockV);
router.get("/stockCOINVERTIR", getStockCOINVERTIR);
router.get("/stockLaminados", getStockLaminados);
router.get("/stock/translado", getTranslado);
router.get("/stockview", getStockview);
router.get("/liberarStock", getStockLiberar);
router.get("/notasFiscalesView", getNotaFiscalView);
router.get("/metas/metasView", getMetasView);
router.get("/getSerieStock/:serie", getOneSerie);
router.get("/getCodInterno/:cod_interno", getCodInterno);
router.get("/stockId", getOneIdProduccion);
router.get("/stock/:id", getOneTicket);
router.put("/updateStock/:id", updateStock);
router.put("/EntradaSalida/:id", updateEntradaSalidaInventario);
router.put("/intermedio/:id", updateIntermedio);
router.put("/updateEmpresa/:id", transferenciaEmpresa);
router.put("/descontarStock/:id", DescontarStock);
router.put("/updateForNote", UpdateForNote);


export default router;
