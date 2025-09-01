
import { Request, Response } from "express";
import { insertData} from "../services/pvb/Insert.services";
import { insertDataPvb} from "../services/pvb/InsertPvb.services";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { generateUpdateQuery } from "../genericQueries/updateBuilder";

import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/pvb/update.services";
// import Category from "../interface/category";
import Descuento from "../interface/descuento";
import Productos from "../interface/productos";
import {getPVB} from "../services/ordenProduccion/getPVB.services"
import { getVerify } from "../services/stock/getVerifyNota.services";
import { createData} from "../services/entradaNotaFiscal/create.services";
import { updateDataM } from "../services/pvb/updateM.services";

export const createPvb = async (req: Request, res: Response) => {
  const tableName = "pvb"; // Reemplaza con el nombre de tu tabla
  const data: Productos = req.body;
  try {
    // Utiliza el servicio para insertar los datos
    const resp = await insertData(tableName, data);

    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating marcacion:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// export const createEntradaNotalFiscal = async (req: Request, res: Response) => {
//   const tableName = "entradaNotaFiscal"; // Reemplaza con el nombre de tu tabla
//   const data: Productos = req.body;
//   const data1=req.body;
//   console.log("🚀 ~ createEntradaNotalFiscal ~ req.body:", req.body)
//   const { numeroNota } = data1;

//   const serieValidate = await getVerify(tableName, numeroNota);
//   if(serieValidate != null){
//     return res.status(400).json({ message: "Ya Existe un Registro con esta Nota Fiscal" });
//   }
  
//   try {
//     // Utiliza el servicio para insertar los datos
//     const resp = await createData(tableName, data);
//     // console.log("🚀 ~ createEntradaNotalFiscal ~ resp:", resp)

//     // Iterar sobre cada elemento del arreglo y actualizar el id_notafiscal
//     data1.data.forEach((item: any) => {
//       item.id_notafiscal = resp.id;
//     });

//     await insertDataPvb("stockpvb", data1.data);
//     // console.log("respuesta insert",resp)

//     res.json({ message: "Data inserted successfully", resp});
//   } catch (error) {
//     console.error("Error creating nota fiscal:", error);

//     if (error instanceof Error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };


export const createEntradaNotalFiscal = async (req: Request, res: Response) => {
  const tableName = "entradaNotaFiscal"; // Nombre de la tabla
  const data = req.body; // Datos completos
  const { numeroNota, data: productos } = data; // Extraer 'numeroNota' y el array 'data'

  try {
    // Validar si la nota fiscal ya existe
    const serieValidate = await getVerify(tableName, numeroNota);
    if (serieValidate != null) {
      return res.status(400).json({ message: "Ya Existe un Registro con esta Nota Fiscal" });
    }

    // Insertar la nota fiscal principal
    const resp = await createData(tableName, data);

    // Agregar el id_notafiscal generado a cada producto
    const productosConIdNotaFiscal = productos.map((producto: any) => ({
      ...producto,
      id_notafiscal: resp.id,
    }));

    // Insertar los productos relacionados
    await insertDataPvb("stockpvb", productosConIdNotaFiscal);

    res.json({ message: "Data inserted successfully", resp });
  } catch (error) {
    console.error("Error creating nota fiscal:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};  


export const getPvbStock= async (req: Request, res: Response) => {
  const tableName = "stockpvbview"; // Reemplaza con el nombre de tu tabla

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


export const getPvb= async (req: Request, res: Response) => {
  const tableName = "pvb"; // Reemplaza con el nombre de tu tabla

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
export const updatePvb = async (req: Request, res: Response) => {
  const tableName = "stockpvb";
  const newData = req.body;
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


export const updatePvbMedida = async (req: Request, res: Response) => {
  const tableName = "stockpvb";
  const newData = req.body;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud

  try {
    await updateDataM(tableName, id, newData);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOneDescuento = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "descuento"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

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


export const getOnePvb = async (req: Request, res: Response) => {
  const { cod } = req.params;
  const tableName = "stockpvb"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getPVB(tableName, cod);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "StockPvb not found" });
    }
  } catch (error) {
    console.error("Error getting StockPvb data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};



export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "stockpvb"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "StockPvb not found" });
    }
  } catch (error) {
    console.error("Error getting StockPvb data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};