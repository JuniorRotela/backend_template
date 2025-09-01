
import { Request, Response } from "express";
import { insertData} from "../services/empresas/Insert.services";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/level/update.services";
//import State from "../interface/state";
import Level from "../interface/level";
import Empresas from "../interface/empresas";



export const createEmpresas = async (req: Request, res: Response) => {
  const tableName = "empresas"; // Reemplaza con el nombre de tu tabla
  const data: Empresas = req.body;
  try {
    // Utiliza el servicio para insertar los datos
    const resp = await insertData(tableName, data);


    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating user:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getEmpresas = async (req: Request, res: Response) => {
  const tableName = "empresas"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting level data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getProductView = async (req: Request, res: Response) => {
  const tableName = "productView"; // Reemplaza con el nombre de tu tabla

  try {
    const gardenData = await getData(tableName);
    res.json(gardenData);
  } catch (error) {    
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


// tu controlador
export const updateGarden = async (req: Request, res: Response) => {
  const tableName = "level";
  const newData: Level = req.body;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud

  try {
    await updateData(tableName, id, newData);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getOneLevel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "level"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "level not found" });
    }
  } catch (error) {
    console.error("Error getting level data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deletelevel = async (req: Request, res: Response) => {
  const tableName = "level"; // Reemplaza con el nombre de tu tabla
  // const newData = req.body;
  const newData: Level = req.body;
  const id = req.params;

  try {
    await deleteGardenData(tableName, newData, id);

    res.json({ message: "Data delete successfully", newData });
  } catch (error) {
    console.error("Error deleting level data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};