import { Request, Response } from "express";
import { insertData} from "../services/marcacion/Insert.services";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/marcacion/update.services";
// import Category from "../interface/category";
import User from "../interface/user";
import Marcacion from "../interface/marcacion";
import { insertSancion } from "../services/marcacion/InsertSancion.services";
import { getDataPlus } from "../services/marcacion/getBuilder";
import { getDataAccess } from "../services/marcacion/DarAcceso";
import { insertDataEntrada } from "../services/marcacion/InsertEntrada.services";


export const createMarcacion = async (req: Request, res: Response) => {

  // console.log("llego en el controlador")
  const tableName = "marcacion"; // Reemplaza con el nombre de tu tabla
  const data: Marcacion = req.body;
  console.log("datos recibidos controller",data);
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

export const createMarcacionEntrada = async (req: Request, res: Response) => {

  // console.log("llego en el controlador")
  const tableName = "marcacion"; // Reemplaza con el nombre de tu tabla
  const data: Marcacion = req.body;
  console.log("datos recibidos controller",data);
  try {
    // console.log("data desde controlador",data)
    // Utiliza el servicio para insertar los datos
    const resp = await insertDataEntrada(tableName, data);
    // console.log("respuesta insert",resp)

    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating marcacion:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const createSanciones = async (req: Request, res: Response) => {
  const tableName = "marcacion"; // Reemplaza con el nombre de tu tabla
  const data: Marcacion = req.body;
  // console.log("datos recibidos controller",data);
  try {
    // console.log("data desde controlador",data)
    // Utiliza el servicio para insertar los datos
    const resp = await insertSancion(tableName, data);
    // console.log("respuesta insert",resp)

    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating marcacion:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getMarcacion = async (req: Request, res: Response) => {
  const tableName = "marcacion"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getResumenView = async (req: Request, res: Response) => {
  const tableName = "ResumenView"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getDarEntrada = async (req: Request, res: Response) => {
  // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getDataAccess();
    res.json(userData);
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getSancionesView = async (req: Request, res: Response) => {
  const tableName = "plusView"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getDataPlus(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getMarcacionView = async (req: Request, res: Response) => {
  const tableName = "MarcacionesView"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
export const getDescuentoView = async (req: Request, res: Response) => {
  const tableName = "descuentosview"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting marcacion data:", error);

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
export const updateMarcacion = async (req: Request, res: Response) => {
  const tableName = "marcacion";
  const newData: Marcacion = req.body;
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


export const getOneMarcacion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "marcacion"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteGarden = async (req: Request, res: Response) => {
  const tableName = "garden"; // Reemplaza con el nombre de tu tabla
  // const newData = req.body;
  const newData: User = req.body;
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