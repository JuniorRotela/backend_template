
import { Request, Response } from "express";
import { insertData} from "../services/calandra/Insert.services";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
// import { updateData } from "../services/descuento/update.services";
// import Category from "../interface/category";
import Descuento from "../interface/descuento";
import HorasExtras from "../interface/horasExtras";
import Metas from "../interface/metas";
import Productos from "../interface/productos";
import Calandra from "../interface/calandra";
import { getOneIdData } from "../services/calandra/getOneId.services";
import { getOneTicketData } from "../services/calandra/getOneTicker.services";
import { updateData } from "../services/pvb/update.services";
import { updateDataCalandra } from "../services/calandra/update.services";
import {updateData2 } from '../services/stock/update.services';
import getOnePaquet from '../services/cargadora/getOne.services';
import getOneDta from "../services/interfoliacion/getOneSerie.services";
import bodyParser from "body-parser";
import CalandraTrue from "../interface/calandraTrue";


export const createCalandra2 = async (req: Request, res: Response) => {
  console.log("datos recibidos controller", req.body);

  const tableName = "calandra"; // Reemplaza con el nombre de tu tabla
  const data: CalandraTrue = req.body;
  const id = req.body.id_pvb;

  const data1 = await getOnePaquet("stock", data.cantidad_entrada);
  const data2 = await getOnePaquet("stock", data.cantidad_utilizada);

  try {
    console.log("data desde controlador", data);

    // Insertar los datos en la tabla "calandra"
    const resp = await insertData(tableName, data);

    // Actualizar stockpvb
    await updateData("stockpvb", id, resp.medidas);

    if (data1.id === data2.id) {
      // Si los paquetes son iguales, hacer una sola actualización restando dos veces
      const newData = { cantidad_entrada: data1.cantidad_entrada - (data.cantidad * 2) };
      await updateData2("stock", data1.id, newData);
    } else {
      // Si son diferentes, restar individualmente
      const newData1 = { cantidad_entrada: data1.cantidad_entrada - data.cantidad };
      const newData2 = { cantidad_entrada: data2.cantidad_entrada - data.cantidad };

      await updateData2("stock", data1.id, newData1);
      await updateData2("stock", data2.id, newData2);
    }

    res.json({ message: "Data inserted successfully", resp });
  } catch (error) {
    console.error("Error creating calandra:", error);

    if (error instanceof Error) {
      console.log("datos recibidos controller", req.body);
      return res.status(500).json({ message: error.message });
    }
  }
};

// export const createCalandra2 = async (req: Request, res: Response) => {
//   // console.log("datos recibidos controller", req.body);

//   const tableName = "calandra"; // Reemplaza con el nombre de tu tabla
//   const data: CalandraTrue = req.body;
//   const id = req.body.id_pvb
//   try {
//     // console.log("data desde controlador",data)
//     // Utiliza el servicio para insertar los datos
    
//     const resp = await insertData(tableName, data);
    
//     // await updateData("stockpvb",id, resp.medidas)

//     res.json({ message: "Data inserted successfully", resp});
//   } catch (error) {
//     console.error("Error creating marcacion:", error);

//     if (error instanceof Error) {
//       console.log("datos recibidos controller",req.body);
      
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };


export const createCalandra = async (req: Request, res: Response) => {
  // console.log("datos recibidos controller",req.body);

  const tableName = "calandra"; // Reemplaza con el nombre de tu tabla
  const data: Calandra = req.body;
  const id = req.body.id_pvb
  try {
    // console.log("data desde controlador",data)
    // Utiliza el servicio para insertar los datos

    const resp = await insertData(tableName, data);
    
    // await updateData("stockpvb",id, resp.medidas)

    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating marcacion:", error);

    if (error instanceof Error) {
      console.log("datos recibidos controller",req.body);
      
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getCalandra= async (req: Request, res: Response) => {
  const tableName = "calandra"; // Reemplaza con el nombre de tu tabla

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
export const updateDescuento = async (req: Request, res: Response) => {
  const tableName = "descuento";
  const newData: Descuento = req.body;
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


export const getOneIdProduccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "calandra"; // Reemplaza con el nombre de tu tabla

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
  const tableName = "ticketview"; // Reemplaza con el nombre de tu tabla
  const ticket = parseInt(id);

  try {
    const Data = await getOneTicketData(tableName, ticket);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "TICKET not found" });
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



export const updateCalandra= async (req: Request, res: Response) => {
  const tableName = "calandra";
  const newData: Calandra = req.body;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud

  try {
    await updateDataCalandra(tableName, id, newData);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
