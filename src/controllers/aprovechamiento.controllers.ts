import { Request, Response } from "express";
import { insertData} from "../services/aprovechamiento/Insert.services";
import aprovechamiento from "../interface/aprovechamiento";


export const createAprovechamiento = async (req: Request, res: Response) => {
  const tableName = "aprovechamiento"; // Reemplaza con el nombre de tu tabla
  const data: aprovechamiento = req.body;
  // console.log("datos recibidos controller",data);
  try {
    // console.log("data desde controlador",data)
    // Utiliza el servicio para insertar los datos
    const resp = await insertData(tableName, data);
    // console.log("respuesta insert",resp)

    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating marcacion:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

