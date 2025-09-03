

import { Request, Response } from "express";
import axios from "axios";




export const createTransaccion = async (req: Request, res: Response) => {
  const PAGOPAR_API_KEY = "33d24b2676f577a06fed74114fe86b54";
  try {
    const data = req.body; // lo que recibís desde el frontend
    console.log("🚀 ~ createTransaccion ~ data:", data)
    console.log("Tu clave de Pagopar es:", PAGOPAR_API_KEY);
    // Configura los headers según la documentación de Pagopar
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.PAGOPAR_API_KEY}`, // usa tu API key
    };

    // Hacemos el request a Pagopar
    const response = await axios.post(
      "https://api.pagopar.com/api/comercios/2.0/iniciar-transaccion",
      data,
      { headers }
    );

    // Retornamos la respuesta al frontend
    return res.json(response.data);

  } catch (error: any) {
    console.error("Error creando transacción:", error.response?.data || error.message);

    return res.status(500).json({
      message: "Error al crear transacción",
      error: error.response?.data || error.message,
    });
  }
};