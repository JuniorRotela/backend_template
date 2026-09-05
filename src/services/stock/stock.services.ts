import { AppDataSource } from "../../db";
import { StockProduct } from "../../entities/StockProduct";
import { StockPurchase } from "../../entities/StockPurchase";
import { StockPurchaseItem } from "../../entities/StockPurchaseItem";
import { DishRecipe } from "../../entities/DishRecipe";
import { StockMovement, MovementType } from "../../entities/StockMovement";
import { StockLoss } from "../../entities/StockLoss";

const toNumber = (v: any): number => Number(v || 0);
const fmt = (n: number): number => Math.round(n * 1000) / 1000;

// ─── Productos ────────────────────────────────────────────────
export const listProducts = async (): Promise<StockProduct[]> => {
  return AppDataSource.getRepository(StockProduct).find({ order: { name: 'ASC' } });
};

export const createProduct = async (data: Partial<StockProduct>): Promise<StockProduct> => {
  const repo = AppDataSource.getRepository(StockProduct);
  const product = repo.create(data);
  return repo.save(product);
};

export const updateProduct = async (id: number, data: Partial<StockProduct>): Promise<StockProduct | null> => {
  const repo = AppDataSource.getRepository(StockProduct);
  const product = await repo.findOneBy({ id });
  if (!product) return null;
  Object.assign(product, data);
  return repo.save(product);
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  const repo = AppDataSource.getRepository(StockProduct);
  const result = await repo.delete({ id });
  return (result.affected || 0) > 0;
};

// ─── Compras ──────────────────────────────────────────────────
export const listPurchases = async (month?: number, year?: number): Promise<any[]> => {
  const repo = AppDataSource.getRepository(StockPurchase);

  let query = repo
    .createQueryBuilder('p')
    .leftJoinAndSelect('p.items', 'items')
    .leftJoinAndSelect('items.product', 'product')
    .orderBy('p.purchase_date', 'DESC')
    .addOrderBy('p.id', 'DESC');

  if (month && year) {
    query = query.where('MONTH(p.purchase_date) = :month AND YEAR(p.purchase_date) = :year', { month, year });
  }

  const purchases = await query.getMany();
  return purchases.map(p => ({
    ...p,
    total_cost: toNumber(p.total_cost),
    items: (p.items || []).map(i => ({
      ...i,
      quantity: toNumber(i.quantity),
      unit_cost: toNumber(i.unit_cost),
      total_cost: toNumber(i.total_cost),
    })),
  }));
};

export const createPurchase = async (data: {
  supplier?: string;
  purchase_date: string;
  notes?: string;
  items: { product_id: number; quantity: number; unit_cost: number }[];
}): Promise<any> => {
  return AppDataSource.manager.transaction(async (manager) => {
    const purchaseRepo = manager.getRepository(StockPurchase);
    const itemRepo = manager.getRepository(StockPurchaseItem);
    const productRepo = manager.getRepository(StockProduct);
    const movementRepo = manager.getRepository(StockMovement);

    const purchase = await purchaseRepo.save(purchaseRepo.create({
      supplier: data.supplier || '',
      purchase_date: data.purchase_date,
      notes: data.notes || '',
      total_cost: 0,
    }));

    let total = 0;
    const savedItems: any[] = [];

    for (const line of data.items) {
      const qty = fmt(toNumber(line.quantity));
      const unitCost = toNumber(line.unit_cost);
      const lineTotal = fmt(qty * unitCost);
      total += lineTotal;

      const item = await itemRepo.save(itemRepo.create({
        purchase_id: purchase.id,
        product_id: line.product_id,
        quantity: qty,
        unit_cost: unitCost,
        total_cost: lineTotal,
      }));

      const product = await productRepo.findOneBy({ id: line.product_id });
      if (product) {
        const current = fmt(toNumber(product.stock_quantity) + qty);
        await productRepo.update(product.id, { stock_quantity: current });
        await movementRepo.save(movementRepo.create({
          product_id: product.id,
          type: 'purchase_in',
          quantity: qty,
          reference_type: 'purchase',
          reference_id: String(purchase.id),
          note: `Compra ${purchase.supplier ? 'de ' + purchase.supplier : ''}`.trim(),
        }));
      }

      savedItems.push({ ...item, quantity: qty, unit_cost: unitCost, total_cost: lineTotal });
    }

    await purchaseRepo.update(purchase.id, { total_cost: fmt(total) });

    return {
      ...purchase,
      total_cost: fmt(total),
      items: savedItems,
    };
  });
};

export const deletePurchase = async (id: number): Promise<boolean> => {
  return AppDataSource.manager.transaction(async (manager) => {
    const itemRepo = manager.getRepository(StockPurchaseItem);
    const productRepo = manager.getRepository(StockProduct);
    const movementRepo = manager.getRepository(StockMovement);

    const items = await itemRepo.findBy({ purchase_id: id });
    for (const item of items) {
      const qty = fmt(toNumber(item.quantity));
      const product = await productRepo.findOneBy({ id: item.product_id });
      if (product) {
        const current = fmt(toNumber(product.stock_quantity) - qty);
        await productRepo.update(product.id, { stock_quantity: current });
        await movementRepo.save(movementRepo.create({
          product_id: product.id,
          type: 'adjustment',
          quantity: -qty,
          reference_type: 'purchase',
          reference_id: String(id),
          note: `Anulación de compra #${id}`,
        }));
      }
    }

    await itemRepo.delete({ purchase_id: id });
    const result = await manager.getRepository(StockPurchase).delete({ id });
    return (result.affected || 0) > 0;
  });
};

// ─── Recetas ──────────────────────────────────────────────────
export const listRecipes = async (dishId?: string): Promise<any[]> => {
  const repo = AppDataSource.getRepository(DishRecipe);
  let query = repo
    .createQueryBuilder('r')
    .leftJoinAndSelect('r.product', 'product');

  if (dishId) {
    query = query.where('r.dish_id = :dishId', { dishId });
  }

  const recipes = await query.orderBy('r.id', 'ASC').getMany();
  return recipes.map(r => ({
    ...r,
    quantity: toNumber(r.quantity),
    product_name: r.product?.name,
    product_unit_type: r.product?.unit_type,
  }));
};

// Reemplaza la receta completa de un plato
export const saveRecipe = async (dishId: string, lines: { product_id: number; quantity: number }[]): Promise<any[]> => {
  return AppDataSource.manager.transaction(async (manager) => {
    const repo = manager.getRepository(DishRecipe);
    await repo.delete({ dish_id: dishId });

    const saved: any[] = [];
    for (const line of lines) {
      const recipe = await repo.save(repo.create({
        dish_id: dishId,
        product_id: line.product_id,
        quantity: fmt(toNumber(line.quantity)),
      }));
      saved.push(recipe);
    }
    return saved;
  });
};

// ─── Movimientos / Stock ──────────────────────────────────────
export const applyMovements = async (
  type: Exclude<MovementType, 'purchase_in'>,
  referenceType: string,
  referenceId: string,
  deductions: { product_id: number; quantity: number }[]
): Promise<{ ok: boolean; insufficient: { product_id: number; name: string; quantity: number }[]; movements: any[] }> => {
  return AppDataSource.manager.transaction(async (manager) => {
    const productRepo = manager.getRepository(StockProduct);
    const movementRepo = manager.getRepository(StockMovement);
    const insufficient: any[] = [];
    const movements: any[] = [];

    for (const d of deductions) {
      const rawQty = toNumber(d.quantity);
      const absQty = fmt(Math.abs(rawQty));
      if (absQty <= 0) continue;

      const product = await productRepo.findOneBy({ id: d.product_id });
      if (!product) {
        insufficient.push({ product_id: d.product_id, name: 'Desconocido', quantity: absQty });
        continue;
      }

      // Para adjustment el quantity llega con signo ya incluido; para sale/loss siempre es negativo
      let signedQty: number;
      if (type === 'adjustment') {
        signedQty = fmt(toNumber(d.quantity));
      } else {
        signedQty = -absQty;
      }

      const current = fmt(toNumber(product.stock_quantity) + signedQty);

      if (current < 0 && type !== 'adjustment') {
        insufficient.push({ product_id: product.id, name: product.name, quantity: Math.abs(current) });
      }

      await productRepo.update(product.id, { stock_quantity: Math.max(0, current) });
      const movement = await movementRepo.save(movementRepo.create({
        product_id: product.id,
        type,
        quantity: signedQty,
        reference_type: referenceType,
        reference_id: referenceId,
        note: type === 'sale_out' ? 'Salida por venta' : type === 'loss_out' ? 'Salida por pérdida' : 'Ajuste de stock',
      }));
      movements.push({ ...movement, quantity: signedQty });
    }

    return { ok: insufficient.length === 0, insufficient, movements };
  });
};

// Deducción por receta de un plato vendido (dado el id del plato y la cantidad)
export const deductByRecipes = async (
  referenceType: string,
  referenceId: string,
  items: { dish_id: string; quantity: number }[]
): Promise<{ ok: boolean; insufficient: any[]; movements: any[] }> => {
  const repo = AppDataSource.getRepository(DishRecipe);
  const deductions: { product_id: number; quantity: number }[] = [];

  for (const item of items) {
    const recipes = await repo.find({ where: { dish_id: item.dish_id }, relations: ['product'] });
    const qtyMultiplier = toNumber(item.quantity);

    for (const recipe of recipes) {
      deductions.push({
        product_id: recipe.product_id,
        quantity: fmt(toNumber(recipe.quantity) * qtyMultiplier),
      });
    }
  }

  return applyMovements('sale_out', referenceType, referenceId, deductions);
};

// ─── Pérdidas ─────────────────────────────────────────────────
export const listLosses = async (month?: number, year?: number): Promise<any[]> => {
  const repo = AppDataSource.getRepository(StockLoss);
  let query = repo
    .createQueryBuilder('l')
    .leftJoinAndSelect('l.product', 'product')
    .orderBy('l.loss_date', 'DESC')
    .addOrderBy('l.id', 'DESC');

  if (month && year) {
    query = query.where('MONTH(l.loss_date) = :month AND YEAR(l.loss_date) = :year', { month, year });
  }

  const losses = await query.getMany();
  return losses.map(l => ({
    ...l,
    quantity: toNumber(l.quantity),
    product_name: l.product?.name,
    product_unit_type: l.product?.unit_type,
    estimated_cost: fmt(toNumber(l.quantity) * (toNumber(l.product?.cost_price) / (l.product?.unit_type === 'weight' ? 1000 : 1))),
  }));
};

export const createLoss = async (data: {
  product_id: number;
  quantity: number;
  reason?: string;
  loss_date: string;
}): Promise<any> => {
  return AppDataSource.manager.transaction(async (manager) => {
    const repo = manager.getRepository(StockLoss);
    const movementRepo = manager.getRepository(StockMovement);
    const productRepo = manager.getRepository(StockProduct);

    const product = await productRepo.findOneBy({ id: data.product_id });
    if (!product) throw new Error('Producto no encontrado');

    const qty = fmt(toNumber(data.quantity));
    if (qty <= 0) throw new Error('La cantidad debe ser mayor a 0');

    const loss = await repo.save(repo.create({
      product_id: data.product_id,
      quantity: qty,
      reason: data.reason || '',
      loss_date: data.loss_date,
    }));

    const current = fmt(toNumber(product.stock_quantity) - qty);
    await productRepo.update(product.id, { stock_quantity: Math.max(0, current) });

    await movementRepo.save(movementRepo.create({
      product_id: product.id,
      type: 'loss_out',
      quantity: -qty,
      reference_type: 'loss',
      reference_id: String(loss.id),
      note: `Pérdida: ${data.reason || 'Sin motivo'}`,
    }));

    return {
      ...loss,
      quantity: qty,
      product_name: product.name,
      product_unit_type: product.unit_type,
      estimated_cost: fmt(qty * (toNumber(product.cost_price) / (product.unit_type === 'weight' ? 1000 : 1))),
    };
  });
};

// ─── Reportes mensuales ───────────────────────────────────────
export const getMonthlyReport = async (month: number, year: number): Promise<any> => {
  const purchaseRepo = AppDataSource.getRepository(StockPurchase);
  const movementRepo = AppDataSource.getRepository(StockMovement);

  // Gasto mensual por compra (detalle)
  const purchases = await purchaseRepo
    .createQueryBuilder('p')
    .leftJoinAndSelect('p.items', 'items')
    .leftJoinAndSelect('items.product', 'product')
    .where('MONTH(p.purchase_date) = :month AND YEAR(p.purchase_date) = :year', { month, year })
    .orderBy('p.purchase_date', 'ASC')
    .getMany();

  const spendByProduct: Record<number, { product_id: number; name: string; quantity: number; total_cost: number }> = {};
  let totalSpend = 0;

  purchases.forEach(p => {
    (p.items || []).forEach(item => {
      const id = item.product_id;
      const qty = toNumber(item.quantity);
      const cost = toNumber(item.total_cost);
      totalSpend += cost;
      if (!spendByProduct[id]) {
        spendByProduct[id] = { product_id: id, name: item.product?.name || `Producto #${id}`, quantity: 0, total_cost: 0 };
      }
      spendByProduct[id].quantity = fmt(spendByProduct[id].quantity + qty);
      spendByProduct[id].total_cost = fmt(spendByProduct[id].total_cost + cost);
    });
  });

  // Pérdidas mensuales
  const losses = await listLosses(month, year);

  // Consumo mensual por ventas (salidas sale_out)
  const salesMovements = await movementRepo
    .createQueryBuilder('m')
    .leftJoinAndSelect('m.product', 'product')
    .where('m.type = :type AND MONTH(m.created_at) = :month AND YEAR(m.created_at) = :year', {
      type: 'sale_out',
      month,
      year,
    })
    .getMany();

  const consumptionByProduct: Record<number, { product_id: number; name: string; quantity: number }> = {};
  salesMovements.forEach(m => {
    const id = m.product_id;
    const qty = Math.abs(toNumber(m.quantity));
    if (!consumptionByProduct[id]) {
      consumptionByProduct[id] = { product_id: id, name: m.product?.name || `Producto #${id}`, quantity: 0 };
    }
    consumptionByProduct[id].quantity = fmt(consumptionByProduct[id].quantity + qty);
  });

  return {
    month,
    year,
    totalSpend: fmt(totalSpend),
    spendByProduct: Object.values(spendByProduct).sort((a, b) => b.total_cost - a.total_cost),
    purchases,
    losses,
    totalLossValue: fmt(losses.reduce((s, l) => s + toNumber(l.estimated_cost), 0)),
    consumptionByProduct: Object.values(consumptionByProduct).sort((a, b) => b.quantity - a.quantity),
  };
};