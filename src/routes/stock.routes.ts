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
  adjustStock,
  getLosses,
  createLoss,
  getMonthlyReport,
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

// Ajuste manual de stock
router.post("/stock/adjust", adjustStock);

// Pérdidas
router.get("/stock/losses", getLosses);
router.post("/stock/losses", createLoss);

// Reporte mensual (gasto por compra)
router.get("/stock/report", getMonthlyReport);

export default router;