"use strict";
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
exports.getRangeReport = exports.getMonthlyReport = exports.deleteExtraIncome = exports.updateExtraIncome = exports.createExtraIncome = exports.listExtraIncomes = exports.getExpensesTotal = exports.deleteExpense = exports.updateExpense = exports.createExpense = exports.listExpenses = exports.deleteLoss = exports.updateLoss = exports.createLoss = exports.listLosses = exports.restockByRecipes = exports.deductByRecipes = exports.applyMovements = exports.saveRecipe = exports.listRecipes = exports.updatePurchase = exports.deletePurchase = exports.createPurchase = exports.listPurchases = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.listProducts = exports.isWeightLike = void 0;
const db_1 = require("../../db");
const StockProduct_1 = require("../../entities/StockProduct");
const StockPurchase_1 = require("../../entities/StockPurchase");
const StockPurchaseItem_1 = require("../../entities/StockPurchaseItem");
const DishRecipe_1 = require("../../entities/DishRecipe");
const StockMovement_1 = require("../../entities/StockMovement");
const StockLoss_1 = require("../../entities/StockLoss");
const Expense_1 = require("../../entities/Expense");
const ExtraIncome_1 = require("../../entities/ExtraIncome");
const toNumber = (v) => Number(v || 0);
const fmt = (n) => Math.round(n * 1000) / 1000;
// Factor de conversión del costo: cost_price está por unidad de presentación.
// Para kg/weight (stock en gramos) se divide por 1000 para obtener costo por gramo.
const costFactorFor = (unitType) => unitType === 'kg' || unitType === 'weight' ? 1000 : 1;
// Indica si el producto se maneja por peso (gramos) o por volumen (ml) o unidades
const isWeightLike = (unitType) => unitType === 'kg' || unitType === 'g' || unitType === 'weight';
exports.isWeightLike = isWeightLike;
// ─── Productos ────────────────────────────────────────────────
const listProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.AppDataSource.getRepository(StockProduct_1.StockProduct).find({ where: { is_active: true }, order: { name: 'ASC' } });
});
exports.listProducts = listProducts;
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(StockProduct_1.StockProduct);
    const product = repo.create(data);
    return repo.save(product);
});
exports.createProduct = createProduct;
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(StockProduct_1.StockProduct);
    const product = yield repo.findOneBy({ id });
    if (!product)
        return null;
    Object.assign(product, data);
    return repo.save(product);
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(StockProduct_1.StockProduct);
    // Soft delete: marca como inactivo para conservar el histórico de movimientos/compras/recetas
    const result = yield repo.update({ id }, { is_active: false });
    return (result.affected || 0) > 0;
});
exports.deleteProduct = deleteProduct;
// ─── Compras ──────────────────────────────────────────────────
// hasInvoice (opcional): true = solo compras con factura, false = solo sin factura
const listPurchases = (month, year, hasInvoice) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(StockPurchase_1.StockPurchase);
    let query = repo
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.items', 'items')
        .leftJoinAndSelect('items.product', 'product')
        .orderBy('p.purchase_date', 'DESC')
        .addOrderBy('p.id', 'DESC');
    if (month && year) {
        query = query.where('MONTH(p.purchase_date) = :month AND YEAR(p.purchase_date) = :year', { month, year });
    }
    // Filtro opcional por factura (compras con/sin factura)
    if (hasInvoice === true || hasInvoice === false) {
        query = (month && year)
            ? query.andWhere('p.has_invoice = :hasInvoice', { hasInvoice })
            : query.where('p.has_invoice = :hasInvoice', { hasInvoice });
    }
    const purchases = yield query.getMany();
    return purchases.map(p => (Object.assign(Object.assign({}, p), { total_cost: toNumber(p.total_cost), discount_percent: toNumber(p.discount_percent), discount_amount: toNumber(p.discount_amount), 
        // Tolerante a boolean (TypeORM) o 1/0 (driver MySQL crudo)
        has_invoice: !!p.has_invoice, subtotal: fmt(toNumber(p.total_cost) + toNumber(p.discount_amount)), items: (p.items || []).map(i => (Object.assign(Object.assign({}, i), { quantity: toNumber(i.quantity), unit_cost: toNumber(i.unit_cost), total_cost: toNumber(i.total_cost) }))) })));
});
exports.listPurchases = listPurchases;
const createPurchase = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.AppDataSource.manager.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
        const purchaseRepo = manager.getRepository(StockPurchase_1.StockPurchase);
        const itemRepo = manager.getRepository(StockPurchaseItem_1.StockPurchaseItem);
        const productRepo = manager.getRepository(StockProduct_1.StockProduct);
        const movementRepo = manager.getRepository(StockMovement_1.StockMovement);
        // Lógica de descuento: puede ser % o valor fijo en guaraníes
        const discountType = data.discount_type === 'fixed' ? 'fixed' : 'percent';
        const discountPercent = discountType === 'percent' ? Math.min(100, Math.max(0, toNumber(data.discount_percent))) : 0;
        const rawFixedAmount = discountType === 'fixed' ? Math.max(0, toNumber(data.discount_amount)) : 0;
        const purchase = yield purchaseRepo.save(purchaseRepo.create({
            supplier: data.supplier || '',
            purchase_date: data.purchase_date,
            notes: data.notes || '',
            discount_percent: discountPercent,
            discount_type: discountType,
            has_invoice: data.has_invoice === true,
            total_cost: 0,
        }));
        let subtotal = 0;
        const savedItems = [];
        for (const line of data.items) {
            const qty = fmt(toNumber(line.quantity));
            const unitCost = toNumber(line.unit_cost);
            const lineTotal = fmt(qty * unitCost);
            subtotal += lineTotal;
            const item = yield itemRepo.save(itemRepo.create({
                purchase_id: purchase.id,
                product_id: line.product_id,
                quantity: qty,
                unit_cost: unitCost,
                total_cost: lineTotal,
                packages_count: line.packages_count || null,
                units_per_package: line.units_per_package || null,
            }));
            const product = yield productRepo.findOneBy({ id: line.product_id });
            if (product) {
                const current = fmt(toNumber(product.stock_quantity) + qty);
                yield productRepo.update(product.id, { stock_quantity: current });
                yield movementRepo.save(movementRepo.create({
                    product_id: product.id,
                    type: 'purchase_in',
                    quantity: qty,
                    reference_type: 'purchase',
                    reference_id: String(purchase.id),
                    note: `Compra ${purchase.supplier ? 'de ' + purchase.supplier : ''}`.trim(),
                }));
            }
            savedItems.push(Object.assign(Object.assign({}, item), { quantity: qty, unit_cost: unitCost, total_cost: lineTotal, packages_count: line.packages_count || null, units_per_package: line.units_per_package || null }));
        }
        const discountAmount = discountType === 'fixed'
            ? fmt(Math.min(rawFixedAmount, subtotal)) // no puede ser mayor al subtotal
            : fmt(subtotal - subtotal * (discountPercent > 0 ? (100 - discountPercent) / 100 : 1));
        const totalCost = fmt(subtotal - discountAmount);
        yield purchaseRepo.update(purchase.id, {
            total_cost: totalCost,
            discount_amount: discountAmount,
            discount_type: discountType,
        });
        return Object.assign(Object.assign({}, purchase), { subtotal: fmt(subtotal), discount_amount: discountAmount, total_cost: totalCost, items: savedItems });
    }));
});
exports.createPurchase = createPurchase;
const deletePurchase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.AppDataSource.manager.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
        const itemRepo = manager.getRepository(StockPurchaseItem_1.StockPurchaseItem);
        const productRepo = manager.getRepository(StockProduct_1.StockProduct);
        const movementRepo = manager.getRepository(StockMovement_1.StockMovement);
        const items = yield itemRepo.findBy({ purchase_id: id });
        for (const item of items) {
            const qty = fmt(toNumber(item.quantity));
            const product = yield productRepo.findOneBy({ id: item.product_id });
            if (product) {
                const current = fmt(toNumber(product.stock_quantity) - qty);
                yield productRepo.update(product.id, { stock_quantity: current });
                yield movementRepo.save(movementRepo.create({
                    product_id: product.id,
                    type: 'adjustment',
                    quantity: -qty,
                    reference_type: 'purchase',
                    reference_id: String(id),
                    note: `Anulación de compra #${id}`,
                }));
            }
        }
        yield itemRepo.delete({ purchase_id: id });
        const result = yield manager.getRepository(StockPurchase_1.StockPurchase).delete({ id });
        return (result.affected || 0) > 0;
    }));
});
exports.deletePurchase = deletePurchase;
const updatePurchase = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.AppDataSource.manager.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const purchaseRepo = manager.getRepository(StockPurchase_1.StockPurchase);
        const itemRepo = manager.getRepository(StockPurchaseItem_1.StockPurchaseItem);
        const productRepo = manager.getRepository(StockProduct_1.StockProduct);
        const movementRepo = manager.getRepository(StockMovement_1.StockMovement);
        const purchase = yield purchaseRepo.findOneBy({ id });
        if (!purchase)
            throw new Error('Compra no encontrada');
        // 1. Revertir stock de los items actuales
        const oldItems = yield itemRepo.findBy({ purchase_id: id });
        for (const item of oldItems) {
            const product = yield productRepo.findOneBy({ id: item.product_id });
            if (product) {
                const current = fmt(toNumber(product.stock_quantity) + toNumber(item.quantity));
                yield productRepo.update(product.id, { stock_quantity: current });
                yield movementRepo.save(movementRepo.create({
                    product_id: product.id,
                    type: 'restock_in',
                    quantity: toNumber(item.quantity),
                    reference_type: 'purchase',
                    reference_id: String(id),
                    note: `Reversión por edición de compra #${id}`,
                }));
            }
        }
        // 2. Actualizar cabecera (lógica de descuento: % o monto fijo)
        const discountType = data.discount_type === 'fixed' ? 'fixed' : 'percent';
        const discountPercent = discountType === 'percent' ? Math.min(100, Math.max(0, toNumber(data.discount_percent))) : 0;
        const rawFixedAmount = discountType === 'fixed' ? Math.max(0, toNumber(data.discount_amount)) : 0;
        const updatedPurchase = yield purchaseRepo.save(purchaseRepo.create(Object.assign(Object.assign({}, purchase), { id, supplier: data.supplier || '', purchase_date: data.purchase_date, notes: data.notes || '', discount_percent: discountPercent, discount_type: discountType, 
            // Si el cliente no envía has_invoice, se conserva el valor actual de la compra
            has_invoice: data.has_invoice === true || data.has_invoice === false ? data.has_invoice : ((_a = purchase.has_invoice) !== null && _a !== void 0 ? _a : false) })));
        // 3. Registrar nuevos items y descontar stock
        yield itemRepo.delete({ purchase_id: id });
        let subtotal = 0;
        const savedItems = [];
        for (const line of data.items) {
            const qty = fmt(toNumber(line.quantity));
            const unitCost = toNumber(line.unit_cost);
            const lineTotal = fmt(qty * unitCost);
            subtotal += lineTotal;
            const item = yield itemRepo.save(itemRepo.create({
                purchase_id: updatedPurchase.id,
                product_id: line.product_id,
                quantity: qty,
                unit_cost: unitCost,
                total_cost: lineTotal,
                packages_count: line.packages_count || null,
                units_per_package: line.units_per_package || null,
            }));
            const product = yield productRepo.findOneBy({ id: line.product_id });
            if (product) {
                const current = fmt(toNumber(product.stock_quantity) + qty);
                yield productRepo.update(product.id, { stock_quantity: current });
                yield movementRepo.save(movementRepo.create({
                    product_id: product.id,
                    type: 'purchase_in',
                    quantity: qty,
                    reference_type: 'purchase',
                    reference_id: String(updatedPurchase.id),
                    note: `Compra editada ${updatedPurchase.supplier ? 'de ' + updatedPurchase.supplier : ''}`,
                }));
            }
            savedItems.push(Object.assign(Object.assign({}, item), { quantity: qty, unit_cost: unitCost, total_cost: lineTotal }));
        }
        const discountAmount = discountType === 'fixed'
            ? fmt(Math.min(rawFixedAmount, subtotal)) // no puede ser mayor al subtotal
            : fmt(subtotal - subtotal * (discountPercent > 0 ? (100 - discountPercent) / 100 : 1));
        const totalCost = fmt(subtotal - discountAmount);
        yield purchaseRepo.update(updatedPurchase.id, {
            total_cost: totalCost,
            discount_amount: discountAmount,
            discount_type: discountType,
        });
        return Object.assign(Object.assign({}, updatedPurchase), { subtotal: fmt(subtotal), discount_amount: discountAmount, total_cost: totalCost, items: savedItems });
    }));
});
exports.updatePurchase = updatePurchase;
// ─── Recetas ──────────────────────────────────────────────────
const listRecipes = (dishId) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(DishRecipe_1.DishRecipe);
    let query = repo
        .createQueryBuilder('r')
        .leftJoinAndSelect('r.product', 'product');
    if (dishId) {
        query = query.where('r.dish_id = :dishId', { dishId });
    }
    const recipes = yield query.orderBy('r.id', 'ASC').getMany();
    return recipes.map(r => {
        var _a, _b;
        return (Object.assign(Object.assign({}, r), { quantity: toNumber(r.quantity), product_name: (_a = r.product) === null || _a === void 0 ? void 0 : _a.name, product_unit_type: (_b = r.product) === null || _b === void 0 ? void 0 : _b.unit_type }));
    });
});
exports.listRecipes = listRecipes;
// Reemplaza la receta completa de un plato
const saveRecipe = (dishId, lines) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.AppDataSource.manager.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
        const repo = manager.getRepository(DishRecipe_1.DishRecipe);
        yield repo.delete({ dish_id: dishId });
        const saved = [];
        for (const line of lines) {
            const recipe = yield repo.save(repo.create({
                dish_id: dishId,
                product_id: line.product_id,
                quantity: fmt(toNumber(line.quantity)),
            }));
            saved.push(recipe);
        }
        return saved;
    }));
});
exports.saveRecipe = saveRecipe;
// ─── Movimientos / Stock ──────────────────────────────────────
const applyMovements = (type, referenceType, referenceId, deductions) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.AppDataSource.manager.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
        const productRepo = manager.getRepository(StockProduct_1.StockProduct);
        const movementRepo = manager.getRepository(StockMovement_1.StockMovement);
        const insufficient = [];
        const movements = [];
        for (const d of deductions) {
            const rawQty = toNumber(d.quantity);
            const absQty = fmt(Math.abs(rawQty));
            if (absQty <= 0)
                continue;
            const product = yield productRepo.findOneBy({ id: d.product_id });
            if (!product) {
                insufficient.push({ product_id: d.product_id, name: 'Desconocido', quantity: absQty });
                continue;
            }
            // Para adjustment el quantity llega con signo ya incluido; para sale/loss siempre es negativo; para restock_in positivo
            let signedQty;
            if (type === 'adjustment') {
                signedQty = fmt(toNumber(d.quantity));
            }
            else if (type === 'restock_in') {
                signedQty = absQty;
            }
            else {
                signedQty = -absQty;
            }
            const current = fmt(toNumber(product.stock_quantity) + signedQty);
            if (current < 0 && type !== 'adjustment' && type !== 'restock_in') {
                insufficient.push({ product_id: product.id, name: product.name, quantity: Math.abs(current) });
            }
            yield productRepo.update(product.id, { stock_quantity: Math.max(0, current) });
            const movement = yield movementRepo.save(movementRepo.create({
                product_id: product.id,
                type,
                quantity: signedQty,
                reference_type: referenceType,
                reference_id: referenceId,
                note: type === 'sale_out' ? 'Salida por venta' : type === 'loss_out' ? 'Salida por pérdida' : type === 'restock_in' ? 'Devolución por cancelación' : 'Ajuste de stock',
            }));
            movements.push(Object.assign(Object.assign({}, movement), { quantity: signedQty }));
        }
        return { ok: insufficient.length === 0, insufficient, movements };
    }));
});
exports.applyMovements = applyMovements;
// Deducción por receta de un plato vendido (dado el id del plato y la cantidad)
const deductByRecipes = (referenceType, referenceId, items) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(DishRecipe_1.DishRecipe);
    const deductions = [];
    const noRecipe = [];
    for (const item of items) {
        const recipes = yield repo.find({ where: { dish_id: item.dish_id }, relations: ['product'] });
        const qtyMultiplier = toNumber(item.quantity);
        if (recipes.length === 0) {
            // Platos sin receta: no se puede descontar nada
            noRecipe.push(item.dish_id);
            continue;
        }
        for (const recipe of recipes) {
            deductions.push({
                product_id: recipe.product_id,
                quantity: fmt(toNumber(recipe.quantity) * qtyMultiplier),
            });
        }
    }
    const result = yield (0, exports.applyMovements)('sale_out', referenceType, referenceId, deductions);
    return Object.assign(Object.assign({}, result), { noRecipe });
});
exports.deductByRecipes = deductByRecipes;
// Reversión de stock por receta (pedido cancelado / devolución). Suma de vuelta lo deducido.
const restockByRecipes = (referenceType, referenceId, items) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(DishRecipe_1.DishRecipe);
    const deductions = [];
    for (const item of items) {
        const recipes = yield repo.find({ where: { dish_id: item.dish_id }, relations: ['product'] });
        const qtyMultiplier = toNumber(item.quantity);
        for (const recipe of recipes) {
            deductions.push({
                product_id: recipe.product_id,
                quantity: fmt(toNumber(recipe.quantity) * qtyMultiplier),
            });
        }
    }
    return (0, exports.applyMovements)('restock_in', referenceType, referenceId, deductions);
});
exports.restockByRecipes = restockByRecipes;
// ─── Pérdidas ─────────────────────────────────────────────────
const listLosses = (month, year) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(StockLoss_1.StockLoss);
    let query = repo
        .createQueryBuilder('l')
        .leftJoinAndSelect('l.product', 'product')
        .orderBy('l.loss_date', 'DESC')
        .addOrderBy('l.id', 'DESC');
    if (month && year) {
        query = query.where('MONTH(l.loss_date) = :month AND YEAR(l.loss_date) = :year', { month, year });
    }
    const losses = yield query.getMany();
    return losses.map(l => {
        var _a, _b, _c, _d;
        return (Object.assign(Object.assign({}, l), { quantity: toNumber(l.quantity), product_name: (_a = l.product) === null || _a === void 0 ? void 0 : _a.name, product_unit_type: (_b = l.product) === null || _b === void 0 ? void 0 : _b.unit_type, estimated_cost: fmt(toNumber(l.quantity) * (toNumber((_c = l.product) === null || _c === void 0 ? void 0 : _c.cost_price) / costFactorFor((_d = l.product) === null || _d === void 0 ? void 0 : _d.unit_type))) }));
    });
});
exports.listLosses = listLosses;
const createLoss = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.AppDataSource.manager.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
        const repo = manager.getRepository(StockLoss_1.StockLoss);
        const movementRepo = manager.getRepository(StockMovement_1.StockMovement);
        const productRepo = manager.getRepository(StockProduct_1.StockProduct);
        const product = yield productRepo.findOneBy({ id: data.product_id });
        if (!product)
            throw new Error('Producto no encontrado');
        const qty = fmt(toNumber(data.quantity));
        if (qty <= 0)
            throw new Error('La cantidad debe ser mayor a 0');
        const loss = yield repo.save(repo.create({
            product_id: data.product_id,
            quantity: qty,
            reason: data.reason || '',
            loss_date: data.loss_date,
        }));
        const current = fmt(toNumber(product.stock_quantity) - qty);
        yield productRepo.update(product.id, { stock_quantity: Math.max(0, current) });
        yield movementRepo.save(movementRepo.create({
            product_id: product.id,
            type: 'loss_out',
            quantity: -qty,
            reference_type: 'loss',
            reference_id: String(loss.id),
            note: `Pérdida: ${data.reason || 'Sin motivo'}`,
        }));
        return Object.assign(Object.assign({}, loss), { quantity: qty, product_name: product.name, product_unit_type: product.unit_type, estimated_cost: fmt(qty * (toNumber(product.cost_price) / costFactorFor(product.unit_type))) });
    }));
});
exports.createLoss = createLoss;
// Editar una pérdida: revierte el efecto anterior y aplica el nuevo
const updateLoss = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.AppDataSource.manager.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
        const lossRepo = manager.getRepository(StockLoss_1.StockLoss);
        const movementRepo = manager.getRepository(StockMovement_1.StockMovement);
        const productRepo = manager.getRepository(StockProduct_1.StockProduct);
        const loss = yield lossRepo.findOneBy({ id });
        if (!loss)
            throw new Error('Pérdida no encontrada');
        const oldQty = fmt(toNumber(loss.quantity));
        const newQty = fmt(toNumber(data.quantity));
        if (newQty <= 0)
            throw new Error('La cantidad debe ser mayor a 0');
        const newProduct = yield productRepo.findOneBy({ id: data.product_id });
        if (!newProduct)
            throw new Error('Producto no encontrado');
        // Si cambió el producto: revertir stock en el viejo y descontar en el nuevo
        if (loss.product_id !== data.product_id) {
            const oldProduct = yield productRepo.findOneBy({ id: loss.product_id });
            if (oldProduct) {
                yield productRepo.update(oldProduct.id, { stock_quantity: fmt(toNumber(oldProduct.stock_quantity) + oldQty) });
                yield movementRepo.save(movementRepo.create({
                    product_id: oldProduct.id,
                    type: 'restock_in',
                    quantity: oldQty,
                    reference_type: 'loss',
                    reference_id: String(id),
                    note: `Reversión de pérdida #${id} (cambio de producto)`,
                }));
            }
            yield productRepo.update(newProduct.id, { stock_quantity: Math.max(0, fmt(toNumber(newProduct.stock_quantity) - newQty)) });
            yield movementRepo.save(movementRepo.create({
                product_id: newProduct.id,
                type: 'loss_out',
                quantity: -newQty,
                reference_type: 'loss',
                reference_id: String(id),
                note: `Pérdida editada: ${data.reason || 'Sin motivo'}`,
            }));
        }
        else {
            // Mismo producto: solo ajustar la diferencia
            const diff = fmt(newQty - oldQty);
            if (diff !== 0) {
                // diff > 0 -> descontar más | diff < 0 -> devolver
                const current = fmt(toNumber(newProduct.stock_quantity) - diff);
                yield productRepo.update(newProduct.id, { stock_quantity: Math.max(0, current) });
                yield movementRepo.save(movementRepo.create({
                    product_id: newProduct.id,
                    type: diff > 0 ? 'loss_out' : 'restock_in',
                    quantity: -diff, // si diff>0 => negativo; si diff<0 => positivo
                    reference_type: 'loss',
                    reference_id: String(id),
                    note: `Ajuste por edición de pérdida #${id}`,
                }));
            }
        }
        const updated = yield lossRepo.save(Object.assign(Object.assign({}, loss), { product_id: data.product_id, quantity: newQty, reason: data.reason || '', loss_date: data.loss_date }));
        return Object.assign(Object.assign({}, updated), { quantity: newQty, product_name: newProduct.name, product_unit_type: newProduct.unit_type, estimated_cost: fmt(newQty * (toNumber(newProduct.cost_price) / costFactorFor(newProduct.unit_type))) });
    }));
});
exports.updateLoss = updateLoss;
// Eliminar una pérdida: devuelve la cantidad al stock y borra el registro
const deleteLoss = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.AppDataSource.manager.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
        const lossRepo = manager.getRepository(StockLoss_1.StockLoss);
        const movementRepo = manager.getRepository(StockMovement_1.StockMovement);
        const productRepo = manager.getRepository(StockProduct_1.StockProduct);
        const loss = yield lossRepo.findOneBy({ id });
        if (!loss)
            return false;
        const product = yield productRepo.findOneBy({ id: loss.product_id });
        if (product) {
            const qty = fmt(toNumber(loss.quantity));
            yield productRepo.update(product.id, { stock_quantity: fmt(toNumber(product.stock_quantity) + qty) });
            yield movementRepo.save(movementRepo.create({
                product_id: product.id,
                type: 'restock_in',
                quantity: qty,
                reference_type: 'loss',
                reference_id: String(id),
                note: `Reversión de pérdida #${id} (eliminada)`,
            }));
        }
        yield lossRepo.delete({ id });
        return true;
    }));
});
exports.deleteLoss = deleteLoss;
// ─── Gastos operativos ────────────────────────────────────────
const listExpenses = (month, year) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(Expense_1.Expense);
    let query = repo
        .createQueryBuilder('e')
        .orderBy('e.expense_date', 'DESC')
        .addOrderBy('e.id', 'DESC');
    if (month && year) {
        query = query.where('MONTH(e.expense_date) = :month AND YEAR(e.expense_date) = :year', { month, year });
    }
    const expenses = yield query.getMany();
    return expenses.map(e => (Object.assign(Object.assign({}, e), { amount: toNumber(e.amount) })));
});
exports.listExpenses = listExpenses;
const createExpense = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(Expense_1.Expense);
    const expense = repo.create({
        description: data.description,
        category: (data.category || 'otros'),
        amount: fmt(toNumber(data.amount)),
        expense_date: data.expense_date,
        notes: data.notes || '',
    });
    return repo.save(expense);
});
exports.createExpense = createExpense;
const updateExpense = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(Expense_1.Expense);
    const expense = yield repo.findOneBy({ id });
    if (!expense)
        return null;
    if (data.amount !== undefined)
        data.amount = fmt(toNumber(data.amount));
    Object.assign(expense, data);
    return repo.save(expense);
});
exports.updateExpense = updateExpense;
const deleteExpense = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(Expense_1.Expense);
    const result = yield repo.delete({ id });
    return (result.affected || 0) > 0;
});
exports.deleteExpense = deleteExpense;
const getExpensesTotal = (month, year) => __awaiter(void 0, void 0, void 0, function* () {
    const expenses = yield (0, exports.listExpenses)(month, year);
    return fmt(expenses.reduce((s, e) => s + toNumber(e.amount), 0));
});
exports.getExpensesTotal = getExpensesTotal;
const listExtraIncomes = (month, year, from, to) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(ExtraIncome_1.ExtraIncome);
    let query = repo.createQueryBuilder('ei').orderBy('ei.date', 'DESC');
    if (from && to) {
        query = query.where('ei.date >= :from AND ei.date <= :to', { from, to });
    }
    else if (month && year) {
        query = query.where('MONTH(ei.date) = :month AND YEAR(ei.date) = :year', { month, year });
    }
    return query.getMany();
});
exports.listExtraIncomes = listExtraIncomes;
const createExtraIncome = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(ExtraIncome_1.ExtraIncome);
    const income = repo.create(data);
    return repo.save(income);
});
exports.createExtraIncome = createExtraIncome;
const updateExtraIncome = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(ExtraIncome_1.ExtraIncome);
    const income = yield repo.findOneBy({ id });
    if (!income)
        return null;
    Object.assign(income, data);
    return repo.save(income);
});
exports.updateExtraIncome = updateExtraIncome;
const deleteExtraIncome = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = db_1.AppDataSource.getRepository(ExtraIncome_1.ExtraIncome);
    const result = yield repo.delete({ id });
    return (result.affected || 0) > 0;
});
exports.deleteExtraIncome = deleteExtraIncome;
// ─── Reportes mensuales ───────────────────────────────────────
const getMonthlyReport = (month, year) => __awaiter(void 0, void 0, void 0, function* () {
    const purchaseRepo = db_1.AppDataSource.getRepository(StockPurchase_1.StockPurchase);
    const movementRepo = db_1.AppDataSource.getRepository(StockMovement_1.StockMovement);
    const expenseRepo = db_1.AppDataSource.getRepository(Expense_1.Expense);
    // Gasto mensual por compra (detalle)
    const purchases = yield purchaseRepo
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.items', 'items')
        .leftJoinAndSelect('items.product', 'product')
        .where('MONTH(p.purchase_date) = :month AND YEAR(p.purchase_date) = :year', { month, year })
        .orderBy('p.purchase_date', 'ASC')
        .getMany();
    const spendByProduct = {};
    let totalSpend = 0;
    let totalDiscount = 0;
    purchases.forEach(p => {
        const itemsSubtotal = (p.items || []).reduce((s, i) => s + toNumber(i.total_cost), 0);
        const discountAmount = toNumber(p.discount_amount);
        // factor de prorrateo = 1 - (descuento/subtotal). Funciona igual para % y para monto fijo
        // porque discount_amount siempre guarda el descuento neto en guaraníes.
        const discountFactor = itemsSubtotal > 0
            ? fmt((itemsSubtotal - discountAmount) / itemsSubtotal)
            : 1;
        totalDiscount += fmt(discountAmount);
        (p.items || []).forEach(item => {
            var _a, _b;
            const id = item.product_id;
            const qty = toNumber(item.quantity);
            // Prorratear el descuento global de la compra en cada línea
            const cost = fmt(toNumber(item.total_cost) * discountFactor);
            totalSpend += cost;
            if (!spendByProduct[id]) {
                spendByProduct[id] = { product_id: id, name: ((_a = item.product) === null || _a === void 0 ? void 0 : _a.name) || `Producto #${id}`, unit_type: ((_b = item.product) === null || _b === void 0 ? void 0 : _b.unit_type) || 'unit', quantity: 0, total_cost: 0 };
            }
            spendByProduct[id].quantity = fmt(spendByProduct[id].quantity + qty);
            spendByProduct[id].total_cost = fmt(spendByProduct[id].total_cost + cost);
        });
    });
    // Pérdidas mensuales
    const losses = yield (0, exports.listLosses)(month, year);
    // Gastos operativos mensuales
    const expenses = yield (0, exports.listExpenses)(month, year);
    // Consumo mensual por ventas (salidas sale_out)
    const salesMovements = yield movementRepo
        .createQueryBuilder('m')
        .leftJoinAndSelect('m.product', 'product')
        .where('m.type = :type AND MONTH(m.created_at) = :month AND YEAR(m.created_at) = :year', {
        type: 'sale_out',
        month,
        year,
    })
        .getMany();
    const consumptionByProduct = {};
    salesMovements.forEach(m => {
        var _a, _b;
        const id = m.product_id;
        const qty = Math.abs(toNumber(m.quantity));
        if (!consumptionByProduct[id]) {
            consumptionByProduct[id] = { product_id: id, name: ((_a = m.product) === null || _a === void 0 ? void 0 : _a.name) || `Producto #${id}`, unit_type: ((_b = m.product) === null || _b === void 0 ? void 0 : _b.unit_type) || 'unit', quantity: 0 };
        }
        consumptionByProduct[id].quantity = fmt(consumptionByProduct[id].quantity + qty);
    });
    return {
        month,
        year,
        totalSpend: fmt(totalSpend),
        totalDiscount: fmt(totalDiscount),
        spendByProduct: Object.values(spendByProduct).sort((a, b) => b.total_cost - a.total_cost),
        purchases,
        losses,
        totalLossValue: fmt(losses.reduce((s, l) => s + toNumber(l.estimated_cost), 0)),
        expenses,
        totalExpenses: fmt(expenses.reduce((s, e) => s + toNumber(e.amount), 0)),
        expensesByCategory: Object.values(expenses.reduce((acc, e) => {
            const cat = e.category || 'otros';
            if (!acc[cat])
                acc[cat] = { category: cat, total: 0 };
            acc[cat].total = fmt(acc[cat].total + toNumber(e.amount));
            return acc;
        }, {})).sort((a, b) => b.total - a.total),
        consumptionByProduct: Object.values(consumptionByProduct).sort((a, b) => b.quantity - a.quantity),
    };
});
exports.getMonthlyReport = getMonthlyReport;
// ─── Reporte por rango de fechas (para el dashboard de ganancias) ──
const getRangeReport = (from, to) => __awaiter(void 0, void 0, void 0, function* () {
    const purchaseRepo = db_1.AppDataSource.getRepository(StockPurchase_1.StockPurchase);
    const lossRepo = db_1.AppDataSource.getRepository(StockLoss_1.StockLoss);
    const expenseRepo = db_1.AppDataSource.getRepository(Expense_1.Expense);
    const purchases = yield purchaseRepo
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.items', 'items')
        .leftJoinAndSelect('items.product', 'product')
        .where('p.purchase_date >= :from AND p.purchase_date <= :to', { from, to })
        .orderBy('p.purchase_date', 'ASC')
        .getMany();
    const losses = yield lossRepo
        .createQueryBuilder('l')
        .leftJoinAndSelect('l.product', 'product')
        .where('l.loss_date >= :from AND l.loss_date <= :to', { from, to })
        .orderBy('l.loss_date', 'ASC')
        .getMany();
    const expenses = yield expenseRepo
        .createQueryBuilder('e')
        .where('e.expense_date >= :from AND e.expense_date <= :to', { from, to })
        .orderBy('e.expense_date', 'ASC')
        .getMany();
    const spendByProduct = {};
    let totalSpend = 0;
    let totalDiscount = 0;
    purchases.forEach(p => {
        const itemsSubtotal = (p.items || []).reduce((s, i) => s + toNumber(i.total_cost), 0);
        const discountAmount = toNumber(p.discount_amount);
        // factor = 1 - (descuento/subtotal): sirve para % y monto fijo (discount_amount siempre es el neto)
        const discountFactor = itemsSubtotal > 0
            ? fmt((itemsSubtotal - discountAmount) / itemsSubtotal)
            : 1;
        totalDiscount += fmt(discountAmount);
        (p.items || []).forEach(item => {
            var _a, _b;
            const id = item.product_id;
            const qty = toNumber(item.quantity);
            const cost = fmt(toNumber(item.total_cost) * discountFactor);
            totalSpend += cost;
            if (!spendByProduct[id]) {
                spendByProduct[id] = { product_id: id, name: ((_a = item.product) === null || _a === void 0 ? void 0 : _a.name) || `Producto #${id}`, unit_type: ((_b = item.product) === null || _b === void 0 ? void 0 : _b.unit_type) || 'unit', quantity: 0, total_cost: 0 };
            }
            spendByProduct[id].quantity = fmt(spendByProduct[id].quantity + qty);
            spendByProduct[id].total_cost = fmt(spendByProduct[id].total_cost + cost);
        });
    });
    const totalLossValue = fmt(losses.reduce((s, l) => { var _a, _b; return s + toNumber(l.quantity) * (toNumber((_a = l.product) === null || _a === void 0 ? void 0 : _a.cost_price) / costFactorFor((_b = l.product) === null || _b === void 0 ? void 0 : _b.unit_type)); }, 0));
    const totalExpenses = fmt(expenses.reduce((s, e) => s + toNumber(e.amount), 0));
    return {
        from,
        to,
        totalSpend: fmt(totalSpend),
        totalDiscount: fmt(totalDiscount),
        purchasesCount: purchases.length,
        spendByProduct: Object.values(spendByProduct).sort((a, b) => b.total_cost - a.total_cost),
        lossesCount: losses.length,
        totalLossValue,
        expensesCount: expenses.length,
        totalExpenses,
    };
});
exports.getRangeReport = getRangeReport;
