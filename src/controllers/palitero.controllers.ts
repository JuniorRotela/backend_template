import { getOneSerieColarData } from '../services/interfoliacion/getOneSerieColar.sevices';

import { Request, Response } from "express";
import { CelebrateError } from 'celebrate';
import { insertData } from "../services/interfoliacion/Insert.services";
import getOneDta from "../services/interfoliacion/getOneSerie.services";
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
import { getPaliteroxd } from '../services/palitero/getPalitero';
import { getOneSerieColarPalitero } from '../services/palitero/getOneSerieColar.sevices';
import { getCaballetePal } from '../services/palitero/getCaballete';
import { parse } from 'path';
import { getOneSerieColarRep } from '../services/palitero/getOneSerieColarRe.sevices';


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


export const getPalitero = async (req: Request, res: Response) => {
  const tableName = "paliteroView"; // Reemplaza con el nombre de tu tabla
  const id = req.params.id;
  const idtrue = parseInt(id);


  try {
    const userData = await getPaliteroxd(tableName, idtrue);
    res.json(userData);
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getPaliteroCab = async (req: Request, res: Response) => {
  const tableName = "caballete"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getCaballetePal(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getIdColarPalitero= async (req: Request, res: Response) => {
  const tableName = "interfoliacion"; // Reemplaza con el nombre de tu tabla
  const id = req.params.id;
  const idtrue = parseInt(id);
  try {
    const userData = await getOneSerieColarPalitero(tableName, idtrue);
    res.json(userData);
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getIdColarReprint= async (req: Request, res: Response) => {
  const tableName = "interfoliacion"; // Reemplaza con el nombre de tu tabla
  const id = req.params.id;
  const idtrue = parseInt(id);
  // console.log("xdxd", id)
  try {
    const userData = await getOneSerieColarRep(tableName, idtrue);
    res.json(userData);
  } catch (error) {
    console.error("Error getting data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

