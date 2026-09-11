import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getPurchases,
  createPurchase,
  deletePurchase,
  getRecipes,
  saveRecipe,
  deductForSale,
  restockForCancel,
  adjustStock,
  getLosses,
  createLoss,
  updateLoss,
  deleteLoss,
  getMonthlyReport,
  getRangeReport,
} from "../controllers/stock.controllers";

const router = Router();

// Productos
router.get("/stock/products", getProducts);
router.post("/stock/products", createProduct);
router.put("/stock/products/:id", updateProduct);
router.delete("/stock/products/:id", deleteProduct);

// Compras
router.get("/stock/purchases", getPurchases);
router.post("/stock/purchases", createPurchase);
router.delete("/stock/purchases/:id", deletePurchase);

// Recetas (ingredientes por plato)
router.get("/stock/recipes", getRecipes);
router.post("/stock/recipes", saveRecipe);

// Deducción de stock por venta
router.post("/stock/deduct", deductForSale);

// Reversión de stock por cancelación de pedido
router.post("/stock/restock", restockForCancel);

// Ajuste manual de stock
router.post("/stock/adjust", adjustStock);

// Pérdidas
router.get("/stock/losses", getLosses);
router.post("/stock/losses", createLoss);
router.put("/stock/losses/:id", updateLoss);
router.delete("/stock/losses/:id", deleteLoss);

// Reporte mensual (gasto por compra)
router.get("/stock/report", getMonthlyReport);

// Reporte por rango de fechas (dashboard de ganancias)
router.get("/stock/report/range", getRangeReport);

export default router;