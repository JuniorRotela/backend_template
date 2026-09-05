import "dotenv/config";
import { Request, Response } from "express";
import * as stock from '../services/stock/stock.services';

// ─── Productos ────────────────────────────────────────────────
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await stock.listProducts();
    res.json(products);
  } catch (error: any) {
    console.error("Error listing products:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await stock.createProduct(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await stock.updateProduct(id, req.body);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error: any) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await stock.deleteProduct(id);
    if (!ok) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
  } catch (error: any) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ─── Compras ──────────────────────────────────────────────────
export const getPurchases = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;
    const purchases = await stock.listPurchases(
      month ? parseInt(month as string, 10) : undefined,
      year ? parseInt(year as string, 10) : undefined
    );
    res.json(purchases);
  } catch (error: any) {
    console.error("Error listing purchases:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const purchase = await stock.createPurchase(req.body);
    res.status(201).json(purchase);
  } catch (error: any) {
    console.error("Error creating purchase:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deletePurchase = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await stock.deletePurchase(id);
    if (!ok) return res.status(404).json({ message: "Compra no encontrada" });
    res.json({ message: "Compra eliminada" });
  } catch (error: any) {
    console.error("Error deleting purchase:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ─── Recetas ──────────────────────────────────────────────────
export const getRecipes = async (req: Request, res: Response) => {
  try {
    const { dishId } = req.query;
    const recipes = await stock.listRecipes(dishId as string | undefined);
    res.json(recipes);
  } catch (error: any) {
    console.error("Error listing recipes:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const saveRecipe = async (req: Request, res: Response) => {
  try {
    const { dish_id, lines } = req.body;
    if (!dish_id) return res.status(400).json({ message: "dish_id es requerido" });
    const recipes = await stock.saveRecipe(dish_id, lines || []);
    res.status(201).json(recipes);
  } catch (error: any) {
    console.error("Error saving recipe:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ─── Deducción por ventas ─────────────────────────────────────
// body: {
//   reference_type, reference_id,
//   items: [{ dish_id, quantity }],        // deduce por receta
//   direct_items: [{ product_id, quantity }] // deduce directo de un producto (ej: buffet gourmet)
// }
export const deductForSale = async (req: Request, res: Response) => {
  try {
    const { reference_type, reference_id, items, direct_items } = req.body;
    if (!reference_type || !reference_id) {
      return res.status(400).json({ message: "reference_type y reference_id son requeridos" });
    }

    const recipeDeduction = await stock.deductByRecipes(
      reference_type,
      String(reference_id),
      Array.isArray(items) ? items : []
    );

    let directDeduction: any = { ok: true, insufficient: [], movements: [] };
    if (Array.isArray(direct_items) && direct_items.length > 0) {
      directDeduction = await stock.applyMovements(
        'sale_out',
        reference_type,
        String(reference_id),
        direct_items.map(d => ({ product_id: d.product_id, quantity: d.quantity }))
      );
    }

    res.json({
      ok: recipeDeduction.ok && directDeduction.ok,
      insufficient: [...recipeDeduction.insufficient, ...directDeduction.insufficient],
      movements: [...recipeDeduction.movements, ...directDeduction.movements],
    });
  } catch (error: any) {
    console.error("Error deducting stock:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Ajuste manual de stock
// body: { product_id, quantity (con signo, + entrada / - salida), note }
export const adjustStock = async (req: Request, res: Response) => {
  try {
    const { product_id, quantity, note } = req.body;
    if (!product_id || !quantity) {
      return res.status(400).json({ message: "product_id y quantity son requeridos" });
    }
    const result = await stock.applyMovements('adjustment', 'manual', `adj-${Date.now()}`, [
      { product_id, quantity: Number(quantity) },
    ]);
    res.json(result);
  } catch (error: any) {
    console.error("Error adjusting stock:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ─── Pérdidas ─────────────────────────────────────────────────
export const getLosses = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;
    const losses = await stock.listLosses(
      month ? parseInt(month as string, 10) : undefined,
      year ? parseInt(year as string, 10) : undefined
    );
    res.json(losses);
  } catch (error: any) {
    console.error("Error listing losses:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createLoss = async (req: Request, res: Response) => {
  try {
    const loss = await stock.createLoss(req.body);
    res.status(201).json(loss);
  } catch (error: any) {
    console.error("Error creating loss:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ─── Reporte mensual ──────────────────────────────────────────
export const getMonthlyReport = async (req: Request, res: Response) => {
  try {
    const month = parseInt(req.query.month as string, 10);
    const year = parseInt(req.query.year as string, 10);
    if (!month || !year) return res.status(400).json({ message: "month y year son requeridos" });
    const report = await stock.getMonthlyReport(month, year);
    res.json(report);
  } catch (error: any) {
    console.error("Error getting report:", error.message);
    res.status(500).json({ message: error.message });
  }
};