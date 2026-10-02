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
exports.getOneOrden = exports.createOrden = void 0;
require("dotenv/config");
const Insert_services_1 = require("../services/orden/Insert.services");
const getOne_services_1 = require("../services/orden/getOne.services");
const stock_services_1 = require("../services/stock/stock.services");
const createOrden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tableName = "orders"; // Reemplaza con el nombre de tu tabla
    const data = req.body;
    console.log("🚀 ~ createOrden ~ data:", data);
    try {
        const resp = yield (0, Insert_services_1.insertDataOr)(tableName, data);
        // console.log("respuesta insert",resp)
        // 🔥 Descontar stock por receta de los platos vendidos (pedido online)
        const items = Array.isArray(data === null || data === void 0 ? void 0 : data.items)
            ? data.items
                .filter((i) => (i === null || i === void 0 ? void 0 : i.id) && (i === null || i === void 0 ? void 0 : i.quantity))
                .map((i) => ({ dish_id: String(i.id), quantity: Number(i.quantity) }))
            : [];
        let stockResult = null;
        if (items.length > 0) {
            try {
                stockResult = yield (0, stock_services_1.deductByRecipes)('online', String((resp === null || resp === void 0 ? void 0 : resp.id) || (resp === null || resp === void 0 ? void 0 : resp.pedido) || 'online'), items);
                console.log("✅ Stock descontado por receta:", stockResult);
            }
            catch (stockError) {
                // No romper la orden si falla el stock, solo avisar
                console.error("⚠️ Error descontando stock:", stockError.message);
                stockResult = { ok: false, insufficient: [], error: stockError.message };
            }
        }
        res.json({ message: "Data inserted successfully", resp, stock: stockResult });
    }
    catch (error) {
        console.error("Error creating marcacion:", error);
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createOrden = createOrden;
const getOneOrden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("🚀 ~ getOneOrden ~ id (raw):", id);
    const tableName = "orders"; // 👈 tu tabla
    const idI = parseInt(id, 10);
    if (isNaN(idI)) {
        return res.status(400).json({ message: "ID inválido, debe ser un número" });
    }
    try {
        const Data = yield (0, getOne_services_1.getOneOrdenx)(tableName, idI);
        if (Data) {
            res.json(Data);
        }
        else {
            res.status(404).json({ message: "Orden no encontrada" });
        }
    }
    catch (error) {
        console.error("Error getting orden data:", error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Error desconocido" });
        }
    }
});
exports.getOneOrden = getOneOrden;
