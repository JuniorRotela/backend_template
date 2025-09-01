
import { Request, Response } from "express";
import { insertData} from "../services/precio/Insert.services";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getDataPrecio } from "../services/precio/getBuilder";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/precio/update.services";
// import Category from "../interface/category";
import Precio from "../interface/precio";
import Descuento from "../interface/descuento";


export const createPrecio = async (req: Request, res: Response) => {
  const tableName = "precio"; // Reemplaza con el nombre de tu tabla
  const data: Precio = req.body;
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

export const getPrecio = async (req: Request, res: Response) => {
  const tableName = "precio"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting precio data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getPrecioProducto = async (req: Request, res: Response) => {
  const tableName = "precio"; // Reemplaza con el nombre de tu tabla
  const pais = req.params.pais;
  const producto = req.params.producto;

  try {
    const userData = await getDataPrecio(tableName, pais, producto);
    res.json(userData);
  } catch (error) {
    console.error("Error getting precio data:", error);

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
export const updatePrecio = async (req: Request, res: Response) => {
  const tableName = "precio";
  const newData: Precio = req.body;
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


export const getOnePrecio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "precio"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "precio not found" });
    }
  } catch (error) {
    console.error("Error getting precio data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteGarden = async (req: Request, res: Response) => {
  const tableName = "garden"; // Reemplaza con el nombre de tu tabla
  // const newData = req.body;
  const newData: Descuento = req.body;
  const id = req.params;

  try {
    await deleteGardenData(tableName, newData, id);

    res.json({ message: "Data delete successfully", newData });
  } catch (error) {
    console.error("Error deleting grupo data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

