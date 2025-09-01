import { Request, Response } from "express";
import { insertData} from "../services/reporteCalandra/Insert.services";
import { getData } from "../genericQueries/getBuilder";
import getOneDta from "../services/reporteCalandra/getOneSerie.services";

// import Category from "../interface/category";
// import Descuento from "../interface/descuento";
// import HorasExtras from "../interface/horasExtras";
import ReporteCalandra from "../interface/reporteCalandra";
import { getDatas } from "../services/ordenProduccion/getBuilder";
// import { io } from "../app";
import OrdenProduccion from "../interface/ordenProduccion";
import { updateDataOrden } from "../services/cargadora/update.services";
import { getOrdenxd } from "../services/ordenProduccion/getOrden.services";


export const getOneSerie = async (req: Request, res: Response) => {
  const { serie } = req.params;
  const tableName = "calandra"; // Reemplaza con el nombre de tu tabla

  try {
    // const reporteId = serie;

    // // Validación simple del id
    // if (isNaN(serie)) {
    //   return res.status(400).json({ message: "Invalid ID parameter" });
    // }

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


export const updateOrdendx = async (Id: any, data: any) => {
  const tableName = "orden_produccion";
  const newData = data;
  
  // console.log("camion desde el back",truckId);
  //  console.log("estado desde el back",newData);

  try {
    const response = await updateDataOrden(tableName, Id, newData);
    //  console.log("respuesta del update", response)
    // Emitir un evento después de la actualización
    const updatedData = await getOrdenxd(tableName, Id);
    // console.log("datos actualizados emitidos");
    // io.emit("ProduccionUpdated", { Id, response });

    return { message: "Data updated successfully" };
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};


export const createReporteCalandra = async (req: Request, res: Response) => {
  const tableName = "reportecalandra"; // Reemplaza con el nombre de tu tabla
  const data: ReporteCalandra = req.body;
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

// export const getOrdenProduccionView = async (req: Request, res: Response) => {
//   const tableName = "ordenproduccionview2"; // Reemplaza con el nombre de tu tabla

//   try {
//     const userData = await getDatas(tableName);
//     res.json(userData);
//   } catch (error) {
//     console.error("Error getting ordenProduccion data:", error);

//     if (error instanceof Error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };

export const fetchLavadoData = async () => {

  const tableName = "ordenproduccionview2"; 
  try {
    const data = await getData(tableName);
    return data;
  } catch (error) {    
    console.error("Error getting truck list data:", error);
    throw error;
  }
};

// Controlador Express que utiliza `fetchTruckData`
export const getOrdenProduccionView = async (req: Request, res: Response) => {

  try {
    const data = await fetchLavadoData();
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

