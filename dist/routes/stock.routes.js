"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stock_controllers_1 = require("../controllers/stock.controllers");
const router = (0, express_1.Router)();
// Productos
router.get("/stock/products", stock_controllers_1.getProducts);
router.post("/stock/products", stock_controllers_1.createProduct);
router.put("/stock/products/:id", stock_controllers_1.updateProduct);
router.delete("/stock/products/:id", stock_controllers_1.deleteProduct);
// Compras
router.get("/stock/purchases", stock_controllers_1.getPurchases);
router.post("/stock/purchases", stock_controllers_1.createPurchase);
router.put("/stock/purchases/:id", stock_controllers_1.updatePurchase);
router.delete("/stock/purchases/:id", stock_controllers_1.deletePurchase);
// Recetas (ingredientes por plato)
router.get("/stock/recipes", stock_controllers_1.getRecipes);
router.post("/stock/recipes", stock_controllers_1.saveRecipe);
// Deducción de stock por venta
router.post("/stock/deduct", stock_controllers_1.deductForSale);
// Reversión de stock por cancelación de pedido
router.post("/stock/restock", stock_controllers_1.restockForCancel);
// Ajuste manual de stock
router.post("/stock/adjust", stock_controllers_1.adjustStock);
// Pérdidas
router.get("/stock/losses", stock_controllers_1.getLosses);
router.post("/stock/losses", stock_controllers_1.createLoss);
router.put("/stock/losses/:id", stock_controllers_1.updateLoss);
router.delete("/stock/losses/:id", stock_controllers_1.deleteLoss);
// Reporte mensual (gasto por compra)
router.get("/stock/report", stock_controllers_1.getMonthlyReport);
// Reporte por rango de fechas (dashboard de ganancias)
router.get("/stock/report/range", stock_controllers_1.getRangeReport);
// Gastos operativos
router.get("/stock/expenses", stock_controllers_1.getExpenses);
router.post("/stock/expenses", stock_controllers_1.createExpense);
router.put("/stock/expenses/:id", stock_controllers_1.updateExpense);
router.delete("/stock/expenses/:id", stock_controllers_1.deleteExpense);
// Ingresos Extras
router.get("/stock/extra-income", stock_controllers_1.getExtraIncomes);
router.post("/stock/extra-income", stock_controllers_1.createExtraIncome);
router.put("/stock/extra-income/:id", stock_controllers_1.updateExtraIncome);
router.delete("/stock/extra-income/:id", stock_controllers_1.deleteExtraIncome);
exports.default = router;
