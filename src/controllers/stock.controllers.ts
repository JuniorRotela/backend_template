
import { Request, Response } from "express";
import { insertData } from "../services/intermedio/insertBuilder";
import { insert } from "../services/intermedio/insert";
import { getData2 } from "../services/stock/getBuilder";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/descuento/update.services";
// import Category from "../interface/category";
import Descuento from "../interface/descuento";
import Stock from "../interface/stock";
import { getOneIdData } from "../services/stock/getOneId.services";
import { getOneTicketData } from "../services/stock/getOneTicker.services";
import getOneDta from "../services/interfoliacion/getOneSerie.services";
import getOne from "../services/stock/getCodInterno.services";
import {updateData2 } from '../services/stock/update.services';
import {updateData3 } from '../services/stock/update3.services';
import {updateForNoteF } from '../services/stock/updateForNote';
import {getData3} from "../services/pedidoVenta/getDatosXD.services"
import {getMonolitico} from "../services/stock/getMonoliticos.services"
import {getLaminado} from "../services/stock/getLaminados.services"
import { getCoinvertir } from "../services/stock/getCoinvertir.services";


export const createStock = async (req: Request, res: Response) => {
  const tableName = "stock"; // Reemplaza con el nombre de tu tabla
  const data: Stock = req.body;
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

export const getStock= async (req: Request, res: Response) => {
  const tableName = "stock"; // Reemplaza con el nombre de tu tabla

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

export const getStockV= async (req: Request, res: Response) => {
  const tableName = "stockv"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getMonolitico(tableName);  
    res.json(userData);
  } catch (error) {
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getStockCOINVERTIR= async (req: Request, res: Response) => {
  const tableName = "stockv"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getCoinvertir(tableName);  
    res.json(userData);
  } catch (error) {
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getStockLaminados= async (req: Request, res: Response) => {
  const tableName = "stockv"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getLaminado(tableName);  
    res.json(userData);
  } catch (error) {
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getTranslado= async (req: Request, res: Response) => {
  const tableName = "translado"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData(tableName);  
    res.json(userData);
  } catch (error) {
    console.error("Error getting registro data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOneSerie = async (req: Request, res: Response) => {
  const { serie } = req.params;
  const tableName = "stock"; // Reemplaza con el nombre de tu tabla

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

export const getCodInterno = async (req: Request, res: Response) => {
  const { cod_interno } = req.params;
  const tableName = "stock"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOne(tableName, cod_interno);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Stock not found" });
    }
  } catch (error) {
    console.error("Error getting Stock data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getStockview= async (req: Request, res: Response) => {
  const tableName = "stockview"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData3(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getStockLiberar= async (req: Request, res: Response) => {
  const tableName = "liberar_stock"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData2(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getNotaFiscalView= async (req: Request, res: Response) => {
  const tableName = "notasfiscales_view"; // Reemplaza con el nombre de tu tabla

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
export const updateStock = async (req: Request, res: Response) => {
  const tableName = "stock";
  const producto = req.body.producto;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud
  const data = {
    status_active: req.body.status_active
  }
  try {
    if(producto== 'PVB'){
      await updateData("stockpvb", id, data);
    }else{
      await updateData(tableName, id, data);
    }
    try {
      await updateData2("entradanotafiscal", id, data);
    } catch (error) {
      console.error("Error updating entradanotafiscal:", error);
      return res.status(500).json({ message: "Error updating entradanotafiscal", error});
    }

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating stock:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOneIdProduccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "stock"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneIdData(tableName);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "stock not found" });
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
  const tableName = "stock"; // Reemplaza con el nombre de tu tabla
  const ticket = parseInt(id);

  try {
    const Data = await getOneTicketData(tableName, ticket);

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

export const getOneDescuento = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "stock"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "stock not found" });
    }
  } catch (error) {
    console.error("Error getting garden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateEntradaSalidaInventario = async (req: Request, res: Response) => {
  const tableName = "stock";
  const newData2 = req.body;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud
  const {id_caballete, cantidad_entrada, obs} = req.body;
  const newData = {
    id_caballete: id_caballete,
    cantidad_entrada: cantidad_entrada,
    obs: obs
  }
  try {
    await insert("inter_ei", newData2);
    await updateData3(tableName, id, newData);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const transferenciaEmpresa = async (req: Request, res: Response) => {
  const tableName = "stock";
  const newData: Stock = req.body;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud
  
  try {
    const response = await getOneData("stock", parseInt(id, 10))
    const data = {
      cod_empresa: req.body.cod_empresa,
      id_caballete: response.id_caballete
    }
    if(response.cod_empresa == newData.cod_empresa){
      return res.status(500).json({ message: "No puedes transferir a la misma empresa" });
    }else{
      await updateData3(tableName, id, data);
    }
    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const updateIntermedio = async (req: Request, res: Response) => {

  const tableName = "stock";
  const newData2 = req.body;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud
  const data = {
    id_caballete: req.body.id_caballete
  }

  try {
    await insertData("translado_inter", newData2);
    await updateData3(tableName, id, data);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const UpdateForNote = async (req: Request, res: Response) => {
  const tableName = "stock";
  const productosActualizados = req.body; // Esto es un array

  try {
    for (const producto of productosActualizados) {
      const { id, cantidad, cod, cod_interno, descripcion, medidas, obs, serie, id_proveedor} = producto;
      const productos = {
        cantidad: cantidad,
        cod: cod,
        cod_interno: cod_interno,
        descripcion: descripcion,
        medidas: medidas,
        obs: obs,
        serie: serie,
        id_proveedor: id_proveedor  
      }
      // Llamás a un servicio que actualiza la cantidad en stock
      await updateForNoteF(tableName, id, productos);
    }

    res.json({ message: "Productos actualizados correctamente" });
  } catch (error) {
    console.error("Error al actualizar los productos:", error);
    return res.status(500).json({ message: "Error al actualizar los productos" });
  }
};


export const DescontarStock = async (req: Request, res: Response) => {
  const tableName = "stock";
  const newData = req.body;
  // console.log("🚀 ~ DescontarStock ~ newData:", newData)
  const id = req.params.id;; // Asumiendo que el id está en los parámetros de la solicitud
  // console.log("🚀 ~ DescontarStock ~ id:", id)

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