
import { Request, Response } from "express";
import { insertData} from "../services/quiebre/Insert.services";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/level/update.services";
//import State from "../interface/state";
import Level from "../interface/level";
import Quiebra from "../interface/quiebra";
import QuiebraInt from "../interface/quiebraInt";
import getOneStockQuiebre from "../services/quiebre/getCodInterno.services";
import getOneTicketRetallos from "../services/quiebre/getOneRetallo.services";
import { insertDataTestRe } from "../services/quiebre/InsertLaminado.services";
import getOneRetallosView from "../services/quiebre/getOneRetalloV.services";
import getOneImagen from "../services/quiebre/getImagen.services";




export const createQuiebra = async (req: Request, res: Response) => {
  const tableName = "quiebra"; 
  const data: Quiebra = req.body;
  try {
    // Utiliza el servicio para insertar los datos
    // const resp = await insertData(tableName, data);
    const resp = await insertDataTestRe(tableName, data);



    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating user:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
export const createQuiebraInt = async (req: Request, res: Response) => {
  const tableName = "quiebra_Intermedio"; 
  const data: QuiebraInt = req.body;
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

export const getQuiebra = async (req: Request, res: Response) => {
  const tableName = "quiebresView"; 

  try {
    const userData = await getData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting quiebra data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getQuiebraInt = async (req: Request, res: Response) => {
  const tableName = "quiebra_intermedio"; 

  try {
    const Data = await getData(tableName);
    res.json(Data);
  } catch (error) {
    console.error("Error getting quiebra_Int data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getQuiebraView = async (req: Request, res: Response) => {
  const tableName = "quiebreView"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getData(tableName);
    res.json(Data);
  } catch (error) {
    console.error("Error getting quiebra data:", error);

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



export const getOneTicketRetallo = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log("=======================================id recibido",id);
  const tableName = "stock"; // Reemplaza con el nombre de tu tabla
  const Id = parseInt(id);
  // console.log("=======================================Id recibido",Id);

  try {
    const Data = await getOneTicketRetallos(tableName, Id);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "retallo not found" });
    }
  } catch (error) {
    console.error("Error getting retallo data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const getOneRetallo = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log("=======================================id recibido",id);
  const tableName = "retallosView"; // Reemplaza con el nombre de tu tabla
  const Id = parseInt(id);
  // console.log("=======================================Id recibido",Id);

  try {
    const Data = await getOneRetallosView(tableName, Id);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "retallo not found" });
    }
  } catch (error) {
    console.error("Error getting retallo data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getOneImagenR = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log("=======================================id recibido",id);
  const tableName = "quiebra"; // Reemplaza con el nombre de tu tabla
  const Id = parseInt(id);
  // console.log("=======================================Id recibido",Id);

  try {
    const Data = await getOneImagen(tableName, Id);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "retallo not found" });
    }
  } catch (error) {
    console.error("Error getting retallo data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getOneStock = async (req: Request, res: Response) => {
  const { serie } = req.params;
  // console.log("=======================================serie recibido",serie);
  const tableName = "stock"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneStockQuiebre(tableName, serie);

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