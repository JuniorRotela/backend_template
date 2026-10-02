"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.createExpense = exports.getExpenses = exports.deleteExtraIncome = exports.updateExtraIncome = exports.createExtraIncome = exports.getExtraIncomes = exports.getRangeReport = exports.getMonthlyReport = exports.deleteLoss = exports.updateLoss = exports.createLoss = exports.getLosses = exports.adjustStock = exports.restockForCancel = exports.deductForSale = exports.saveRecipe = exports.getRecipes = exports.deletePurchase = exports.updatePurchase = exports.createPurchase = exports.getPurchases = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = void 0;
require("dotenv/config");
const stock = __importStar(require("../services/stock/stock.services"));
// ─── Productos ────────────────────────────────────────────────
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield stock.listProducts();
        res.json(products);
    }
    catch (error) {
        console.error("Error listing products:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield stock.createProduct(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const product = yield stock.updateProduct(id, req.body);
        if (!product)
            return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product);
    }
    catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const ok = yield stock.deleteProduct(id);
        if (!ok)
            return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto eliminado" });
    }
    catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteProduct = deleteProduct;
// ─── Compras ──────────────────────────────────────────────────
const getPurchases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month, year, hasInvoice } = req.query;
        // hasInvoice: 'true' = solo compras con factura, 'false' = solo sin factura (opcional)
        const invoiceFilter = hasInvoice === 'true' ? true : hasInvoice === 'false' ? false : undefined;
        const purchases = yield stock.listPurchases(month ? parseInt(month, 10) : undefined, year ? parseInt(year, 10) : undefined, invoiceFilter);
        res.json(purchases);
    }
    catch (error) {
        console.error("Error listing purchases:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.getPurchases = getPurchases;
const createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchase = yield stock.createPurchase(req.body);
        res.status(201).json(purchase);
    }
    catch (error) {
        console.error("Error creating purchase:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.createPurchase = createPurchase;
const updatePurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const purchase = yield stock.updatePurchase(id, req.body);
        if (!purchase)
            return res.status(404).json({ message: "Compra no encontrada" });
        res.json(purchase);
    }
    catch (error) {
        console.error("Error updating purchase:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.updatePurchase = updatePurchase;
const deletePurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const ok = yield stock.deletePurchase(id);
        if (!ok)
            return res.status(404).json({ message: "Compra no encontrada" });
        res.json({ message: "Compra eliminada" });
    }
    catch (error) {
        console.error("Error deleting purchase:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deletePurchase = deletePurchase;
// ─── Recetas ──────────────────────────────────────────────────
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dishId } = req.query;
        const recipes = yield stock.listRecipes(dishId);
        res.json(recipes);
    }
    catch (error) {
        console.error("Error listing recipes:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.getRecipes = getRecipes;
const saveRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dish_id, lines } = req.body;
        if (!dish_id)
            return res.status(400).json({ message: "dish_id es requerido" });
        const recipes = yield stock.saveRecipe(dish_id, lines || []);
        res.status(201).json(recipes);
    }
    catch (error) {
        console.error("Error saving recipe:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.saveRecipe = saveRecipe;
// ─── Deducción por ventas ─────────────────────────────────────
// body: {
//   reference_type, reference_id,
//   items: [{ dish_id, quantity }],        // deduce por receta
//   direct_items: [{ product_id, quantity }] // deduce directo de un producto (ej: buffet gourmet)
// }
const deductForSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reference_type, reference_id, items, direct_items } = req.body;
        if (!reference_type || !reference_id) {
            return res.status(400).json({ message: "reference_type y reference_id son requeridos" });
        }
        const recipeDeduction = yield stock.deductByRecipes(reference_type, String(reference_id), Array.isArray(items) ? items : []);
        let directDeduction = { ok: true, insufficient: [], movements: [] };
        if (Array.isArray(direct_items) && direct_items.length > 0) {
            directDeduction = yield stock.applyMovements('sale_out', reference_type, String(reference_id), direct_items.map(d => ({ product_id: d.product_id, quantity: d.quantity })));
        }
        res.json({
            ok: recipeDeduction.ok && directDeduction.ok,
            insufficient: [...recipeDeduction.insufficient, ...directDeduction.insufficient],
            movements: [...recipeDeduction.movements, ...directDeduction.movements],
            noRecipe: recipeDeduction.noRecipe || [],
        });
    }
    catch (error) {
        console.error("Error deducting stock:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deductForSale = deductForSale;
// ─── Reversión de stock por cancelación ───────────────────────
// body: { reference_type, reference_id, items: [{ dish_id, quantity }], direct_items: [{ product_id, quantity }] }
const restockForCancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reference_type, reference_id, items, direct_items } = req.body;
        if (!reference_type || !reference_id) {
            return res.status(400).json({ message: "reference_type y reference_id son requeridos" });
        }
        const recipeRestock = yield stock.restockByRecipes(reference_type, String(reference_id), Array.isArray(items) ? items : []);
        let directRestock = { ok: true, insufficient: [], movements: [] };
        if (Array.isArray(direct_items) && direct_items.length > 0) {
            directRestock = yield stock.applyMovements('restock_in', reference_type, String(reference_id), direct_items.map(d => ({ product_id: d.product_id, quantity: d.quantity })));
        }
        res.json({
            ok: recipeRestock.ok && directRestock.ok,
            insufficient: [...recipeRestock.insufficient, ...directRestock.insufficient],
            movements: [...recipeRestock.movements, ...directRestock.movements],
        });
    }
    catch (error) {
        console.error("Error restocking stock:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.restockForCancel = restockForCancel;
// Ajuste manual de stock
// body: { product_id, quantity (con signo, + entrada / - salida), note }
const adjustStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, quantity, note } = req.body;
        if (!product_id || !quantity) {
            return res.status(400).json({ message: "product_id y quantity son requeridos" });
        }
        const result = yield stock.applyMovements('adjustment', 'manual', `adj-${Date.now()}`, [
            { product_id, quantity: Number(quantity) },
        ]);
        res.json(result);
    }
    catch (error) {
        console.error("Error adjusting stock:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.adjustStock = adjustStock;
// ─── Pérdidas ─────────────────────────────────────────────────
const getLosses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month, year } = req.query;
        const losses = yield stock.listLosses(month ? parseInt(month, 10) : undefined, year ? parseInt(year, 10) : undefined);
        res.json(losses);
    }
    catch (error) {
        console.error("Error listing losses:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.getLosses = getLosses;
const createLoss = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loss = yield stock.createLoss(req.body);
        res.status(201).json(loss);
    }
    catch (error) {
        console.error("Error creating loss:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.createLoss = createLoss;
const updateLoss = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const loss = yield stock.updateLoss(id, req.body);
        res.json(loss);
    }
    catch (error) {
        console.error("Error updating loss:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.updateLoss = updateLoss;
const deleteLoss = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const ok = yield stock.deleteLoss(id);
        if (!ok)
            return res.status(404).json({ message: "Pérdida no encontrada" });
        res.json({ message: "Pérdida eliminada" });
    }
    catch (error) {
        console.error("Error deleting loss:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteLoss = deleteLoss;
// ─── Reporte mensual ──────────────────────────────────────────
const getMonthlyReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const month = parseInt(req.query.month, 10);
        const year = parseInt(req.query.year, 10);
        if (!month || !year)
            return res.status(400).json({ message: "month y year son requeridos" });
        const report = yield stock.getMonthlyReport(month, year);
        res.json(report);
    }
    catch (error) {
        console.error("Error getting report:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.getMonthlyReport = getMonthlyReport;
// ─── Reporte por rango de fechas (dashboard de ganancias) ─────
const getRangeReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to } = req.query;
        if (!from || !to)
            return res.status(400).json({ message: "from y to (YYYY-MM-DD) son requeridos" });
        const report = yield stock.getRangeReport(from, to);
        res.json(report);
    }
    catch (error) {
        console.error("Error getting range report:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.getRangeReport = getRangeReport;
// ─── Ingresos Extras ──────────────────────────────────────────
const getExtraIncomes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month, year, from, to } = req.query;
        const incomes = yield stock.listExtraIncomes(month ? parseInt(month, 10) : undefined, year ? parseInt(year, 10) : undefined, from, to);
        res.json(incomes);
    }
    catch (error) {
        console.error("Error listing extra incomes:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.getExtraIncomes = getExtraIncomes;
const createExtraIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const income = yield stock.createExtraIncome(req.body);
        res.status(201).json(income);
    }
    catch (error) {
        console.error("Error creating extra income:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.createExtraIncome = createExtraIncome;
const updateExtraIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const income = yield stock.updateExtraIncome(id, req.body);
        if (!income)
            return res.status(404).json({ message: "Ingreso extra no encontrado" });
        res.json(income);
    }
    catch (error) {
        console.error("Error updating extra income:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.updateExtraIncome = updateExtraIncome;
const deleteExtraIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const ok = yield stock.deleteExtraIncome(id);
        if (!ok)
            return res.status(404).json({ message: "Ingreso extra no encontrado" });
        res.json({ message: "Ingreso extra eliminado" });
    }
    catch (error) {
        console.error("Error deleting extra income:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteExtraIncome = deleteExtraIncome;
// ─── Gastos operativos ────────────────────────────────────────
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month, year } = req.query;
        const expenses = yield stock.listExpenses(month ? parseInt(month, 10) : undefined, year ? parseInt(year, 10) : undefined);
        res.json(expenses);
    }
    catch (error) {
        console.error("Error listing expenses:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.getExpenses = getExpenses;
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expense = yield stock.createExpense(req.body);
        res.status(201).json(expense);
    }
    catch (error) {
        console.error("Error creating expense:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.createExpense = createExpense;
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const expense = yield stock.updateExpense(id, req.body);
        if (!expense)
            return res.status(404).json({ message: "Gasto no encontrado" });
        res.json(expense);
    }
    catch (error) {
        console.error("Error updating expense:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.updateExpense = updateExpense;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const ok = yield stock.deleteExpense(id);
        if (!ok)
            return res.status(404).json({ message: "Gasto no encontrado" });
        res.json({ message: "Gasto eliminado" });
    }
    catch (error) {
        console.error("Error deleting expense:", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteExpense = deleteExpense;
