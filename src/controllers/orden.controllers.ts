import "dotenv/config";
import { Request, Response } from "express";
import { insertDataOr } from '../services/orden/Insert.services';
import { getOneOrdenx } from '../services/orden/getOne.services';
import { deductByRecipes } from '../services/stock/stock.services';

export const createOrden = async (req: Request, res: Response) => {
  const tableName = "orders"; // Reemplaza con el nombre de tu tabla
  const data = req.body;
  console.log("🚀 ~ createOrden ~ data:", data)

  try {

    const resp = await insertDataOr(tableName, data);
    // console.log("respuesta insert",resp)

    // 🔥 Descontar stock por receta de los platos vendidos (pedido online)
    const items = Array.isArray(data?.items)
      ? data.items
          .filter((i: any) => i?.id && i?.quantity)
          .map((i: any) => ({ dish_id: String(i.id), quantity: Number(i.quantity) }))
      : [];

    let stockResult = null;
    if (items.length > 0) {
      try {
        stockResult = await deductByRecipes('online', String(resp?.id || resp?.pedido || 'online'), items);
        console.log("✅ Stock descontado por receta:", stockResult);
      } catch (stockError: any) {
        // No romper la orden si falla el stock, solo avisar
        console.error("⚠️ Error descontando stock:", stockError.message);
        stockResult = { ok: false, insufficient: [], error: stockError.message };
      }
    }

    res.json({ message: "Data inserted successfully", resp, stock: stockResult });
  } catch (error) {
    console.error("Error creating marcacion:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getOneOrden = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("🚀 ~ getOneOrden ~ id (raw):", id);

  const tableName = "orders"; // 👈 tu tabla
  const idI = parseInt(id, 10);

  if (isNaN(idI)) {
    return res.status(400).json({ message: "ID inválido, debe ser un número" });
  }

  try {
    const Data = await getOneOrdenx(tableName, idI);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Orden no encontrada" });
    }
  } catch (error) {
    console.error("Error getting orden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error desconocido" });
    }
  }
};