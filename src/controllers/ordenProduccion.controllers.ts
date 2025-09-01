// import { data } from 'cheerio/dist/commonjs/api/attributes';
import { Request, Response } from "express";
import { insertData} from "../services/ordenProduccion/Insert.services";
import { getDatas} from "../services/ordenProduccion/getBuilder";
import  {getUltimaOrden} from "../services/ordenProduccion/getUltimaOrden";
import  {getOrdenSeries} from "../services/ordenProduccion/getOrdenSeries.services";
import  { getOrdenxd } from "../services/ordenProduccion/getOrden.services";
import {getVerificarStock } from "../services/ordenProduccion/getVerificarStock.services"
import {getVerificarPvb } from "../services/ordenProduccion/getVerificaPvb.services"
import { getSerie } from './../services/ordenProduccion/getSerie.services';

// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/ordenProduccion/update.services";
import getOneDta from "../services/interfoliacion/getOneSerie.services";
// import Category from "../interface/category";
import OrdenProduccion from "../interface/ordenProduccion";
import Descuento from "../interface/descuento";
import actualizarReservas from "../services/ordenProduccion/actualizarReservas";
import {updateData2 } from '../services/stock/update.services';


export const createOrdenProduccion = async (req: Request, res: Response) => {
  const tableName = "orden_produccion"; // Reemplaza con el nombre de tu tabla
  const data: OrdenProduccion = req.body;
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

export const getSeriexd = async (req: Request, res: Response) => {
  const { orden } = req.params;
  const tableName = "orden_produccion"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getSerie(tableName, parseInt(orden, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "ordenProduccion not found" });
    }
  } catch (error) {
    console.error("Error getting ordenProduccion data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const getOrdenProduccion = async (req: Request, res: Response) => {
  const tableName = "orden_produccion"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting ordenProduccion data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOrdenProduccionView = async (req: Request, res: Response) => {
  const tableName = "ordenproduccionview2"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getDatas(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting ordenProduccion data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOrdenProduccionView2 = async (req: Request, res: Response) => {
  const tableName = "ordenproduccionview"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getDatas(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting ordenProduccion data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOrden = async (req: Request, res: Response) => {
  const tableName = "orden_produccion"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getUltimaOrden(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting ordenProduccion data:", error);

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
export const updateOrdenProduccion = async (req: Request, res: Response) => {
  const tableName = "orden_produccion";
  const newData: OrdenProduccion = req.body;
  const orden = req.params.orden; // Asumiendo que el id está en los parámetros de la solicitud
  try {
    await updateData(tableName, orden, newData);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getOneOrdenProduccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "orden_produccion"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "ordenProduccion not found" });
    }
  } catch (error) {
    console.error("Error getting ordenProduccion data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const getOrdenOne = async (req: Request, res: Response) => {
  const { orden } = req.params;
  const tableName = "ordenproduccionview2"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOrdenxd(tableName, parseInt(orden, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "ordenProduccion not found" });
    }
  } catch (error) {
    console.error("Error getting ordenProduccion data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const getSerieOrden = async (req: Request, res: Response) => {
  const { orden } = req.params;
  const tableName = "orden_produccion"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOrdenSeries(tableName, parseInt(orden, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "ordenProduccion not found" });
    }
  } catch (error) {
    console.error("Error getting ordenProduccion data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// export const getVerificar = async (req: Request, res: Response) => {
//   const { cod } = req.params;
//   const tableName = "stockview"; // Reemplaza con el nombre de tu tabla

//   try {
//     const Data = await getVerificarStock(tableName, cod);

//     if (Data) {
//       res.json(Data);
//     } else {
//       res.status(404).json({ message: "Stock en falta" });
//     }
//   } catch (error) {
//     console.error("Error getting Stock data:", error);

//     if (error instanceof Error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// };

export const getVerificar = async (req: Request, res: Response) => {
  const { cod } = req.params;
  const tableName = "stockview"; // Reemplaza con el nombre de tu tabla

  try {
      if (!cod || typeof cod !== "string") {
          return res.status(400).json({ message: "Código inválido o faltante" });
      }
      
      const Data = await getVerificarStock(tableName, cod);

      if (Data && Data.length > 0) {
          res.json({ success: true, data: Data });
      } else {
        res.json({ data: [],message: "Stock en falta" });
          // res.status(200).json({ message: "Stock en falta" });
      }
  } catch (error) {
      if (error instanceof Error) {
          console.error("Error getting Stock data:", error.message, error.stack);
          res.status(500).json({ message: "Error interno del servidor: " + error.message });
      } else {
          console.error("Error desconocido:", error);
          res.status(500).json({ message: "Error interno del servidor." });
      }
  }
};


export const getVerificarPVB = async (req: Request, res: Response) => {
  const { cod } = req.params;
  const tableName = "productos"; // Reemplaza con el nombre de tu tabla

  try {
      if (!cod || typeof cod !== "string") {
          return res.status(400).json({ message: "Código inválido o faltante" });
      }

      const Data = await getVerificarPvb(tableName, cod);

      if (Data && Data.length > 0) {
          res.json({ success: true, data: Data });
      } else {
          res.status(404).json({ message: "Stock en falta" });
      }
  } catch (error) {
      if (error instanceof Error) {
          console.error("Error getting Stock data:", error.message, error.stack);
          res.status(500).json({ message: "Error interno del servidor: " + error.message });
      } else {
          console.error("Error desconocido:", error);
          res.status(500).json({ message: "Error interno del servidor." });
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

export const getOneSerie = async (req: Request, res: Response) => {
  const { serie } = req.params;
  const tableName = "orden_produccion"; // Reemplaza con el nombre de tu tabla

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

export const getSerieEtiqueta = async (req: Request, res: Response) => {
  const { serie } = req.params;
  const tableName = "ticketview"; // Reemplaza con el nombre de tu tabla

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


export const actualizarReservasHandler = async (req: Request, res: Response): Promise<void> => {
  const { paquete, cantidad } = req.body;

  try {
    if (!paquete || !cantidad) {
      res.status(400).json({ message: "Paquete y cantidad son obligatorios" });
      return;
    }

    await actualizarReservas(paquete, cantidad);

    res.status(200).json({ message: "Reservas actualizadas correctamente" });
  } catch (error) {
    // Asegúrate de que `error` sea tratado como un objeto con `message`
    if (error instanceof Error) {
      res.status(500).json({ message: "Error al actualizar reservas", error: error.message });
    } else {
      res.status(500).json({ message: "Error desconocido al actualizar reservas" });
    }
  }
};


export const putNs = async (req: Request, res: Response) => {
  const tableName = "orden_produccion";
  const newData = req.body;
  const id = req.params.id;; // Asumiendo que el id está en los parámetros de la solicitud

  try {
    await updateData2(tableName, id, newData);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};