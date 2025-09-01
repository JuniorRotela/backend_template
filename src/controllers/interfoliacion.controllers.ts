import { getOneSerieColarData } from './../services/interfoliacion/getOneSerieColar.sevices';

import { Request, Response } from "express";
import { CelebrateError } from 'celebrate';
import { insertData } from "../services/interfoliacion/Insert.services";
import getOneDta from "../services/interfoliacion/getOneSerie.services";
import {desactivar} from "../services/interfoliacion/desactivar.services";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/descuento/update.services";
// import Category from "../interface/category";
import Descuento from "../interface/descuento";
import HorasExtras from "../interface/horasExtras";
import Metas from "../interface/metas";
import Productos from "../interface/productos";
import Interfoliacion from "../interface/interfoliacion";
import { getOneIdData } from "../services/calandra/getOneId.services";
import { getOneTicketData } from "../services/calandra/getOneTicker.services";
import { getDataCV } from '../services/interfoliacion/getBuilder';
import { getOneSerieReprintColar } from '../services/interfoliacion/getReprintColar.sevices';
import { getDataReprintColar } from '../services/interfoliacion/getDatosReprintColar';


// export const createInterfoliacion = async (req: Request, res: Response) => {
//   const tableName = "interfoliacion"; // Reemplaza con el nombre de tu tabla
//   const data: Interfoliacion = req.body;
//   console.log(req.body)
//   console.log("datos recibidos controller",data);
//   try {
//     // console.log("data desde controlador",data)
//     // Utiliza el servicio para insertar los datos
//     const resp = await insertData(tableName, data);
//     // console.log("respuesta insert",resp)

//     res.json({ message: "Data inserted successfully", resp});
//   } catch (error) {
//     console.error("Error creating marcacion:", error);

//     if (error instanceof Error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };

export const createInterfoliacion = async (req: Request, res: Response) => {
  const data: Interfoliacion = req.body;
  console.log("Datos recibidos en el controlador:", data);

  try {
    const resp = await insertData("interfoliacion", data);
    res.json({ message: "Data inserted successfully", resp });
  } catch (error) {
    console.error("Error creando interfoliacion:", error);

    // Verificar si el error es una instancia de CelebrateError (de la validación)
    if (error instanceof CelebrateError) {
      return res.status(400).json({ message: "Validation failed", details: error.details });
    }

    // Manejo de errores generales
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    // Si el error es de un tipo desconocido
    return res.status(500).json({ message: "An unknown error occurred" });
  }
};

export const getOneSerie = async (req: Request, res: Response) => {
  const { serie } = req.params;
  const tableName = "calandra"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneDta(tableName, serie);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Reporte not found" });
    }
  } catch (error) {
    console.error("Error getting reporte data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getOneSerieInterfoliacion = async (req: Request, res: Response) => {
  const { serie } = req.params;
  const tableName = "interfoliacion"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneDta(tableName, serie);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Reporte not found" });
    }
  } catch (error) {
    console.error("Error getting reporte data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getOneSerieImpresion = async (req: Request, res: Response) => {
  const { serie } = req.params;
  const tableName = "ticketinter"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneDta(tableName, serie);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Reporte not found" });
    }
  } catch (error) {
    console.error("Error getting reporte data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const getInterfoliacion= async (req: Request, res: Response) => {
  const tableName = "interfoliacion"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getInterfoliacionColar= async (req: Request, res: Response) => {
  const tableName = "interfoliacionColarView"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getDataCV(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getIdColar= async (req: Request, res: Response) => {
  const tableName = "interfoliacion"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getOneSerieColarData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getReprintColar= async (req: Request, res: Response) => {
  const tableName = "interfoliacion"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getOneSerieReprintColar(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getMetasView = async (req: Request, res: Response) => {
  const tableName = "metasView"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting product data:", error);

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
export const updateInterfoliacion = async (req: Request, res: Response) => {
  const tableName = "interfoliacion";
  const newData: Interfoliacion = req.body;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud

  try {
    await desactivar(tableName, id, newData);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getOneIdProduccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "inferfoliacion"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneIdData(tableName);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "descuento not found" });
    }
  } catch (error) {
    console.error("Error getting garden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getOneTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "ticketinter"; // Reemplaza con el nombre de tu tabla
  const ticket = parseInt(id);

  try {
    const Data = await getOneTicketData(tableName, ticket);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "interfoliacion not found" });
    }
  } catch (error) {
    console.error("Error getting garden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getOneColar = async (req: Request, res: Response) => {
  const { serie } = req.params;
  

  try {
    const Data = await getDataReprintColar(serie);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "interfoliacion not found" });
    }
  } catch (error) {
    console.error("Error getting garden data:", error);

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