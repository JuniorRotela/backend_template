import { Request, Response } from "express";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
//import { getOneSalarios } from "../services/salarios/getOne.services";
// import Category from "../interface/category";
import Descuento from "../interface/descuento";
import Grupos from "../interface/grupos";
import Salario from "../interface/salarios";
import { insertData } from "../services/pagos/Insert.services";
import { updateData } from "../services/salarios/update.services";
import Pagos from "../interface/pagos";



export const createPago = async (req: Request, res: Response) => {
  const tableName = "pago_salarios"; // Reemplaza con el nombre de tu tabla
  const data: Pagos = req.body;
//  console.log("Omg esto sera epico papus",data);
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

export const getPagos = async (req: Request, res: Response) => {
  const tableName = "pagosView"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting  data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getAguinaldoIpsView = async (req: Request, res: Response) => {
  const tableName = "aguinaldoIpsView"; // Reemplaza con el nombre de tu tabla

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

export const getAguinaldoRealView = async (req: Request, res: Response) => {
  const tableName = "aguinaldoRealView"; // Reemplaza con el nombre de tu tabla

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
export const updateSalarios = async (req: Request, res: Response) => {
  const tableName = "salarios";
  const newData: Grupos = req.body;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud
// console.log(newData);
// console.log(id)
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


export const getOneSalarios = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "salarios"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "salarios not found" });
    }
  } catch (error) {
    console.error("Error getting salarios data:", error);

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
    console.error("Error deleting garden data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};