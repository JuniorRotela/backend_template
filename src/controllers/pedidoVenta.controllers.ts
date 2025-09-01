import { cargaPedidoSchema } from './../validators/cargaPedido.validation';
import { Request, Response } from "express";
import { createData} from "../services/pedidoVenta/create.services";
import { insertDataCarga} from "../services/pedidoVenta/createCarga.services";
import { insertDataLiberarCarga} from "../services/pedidoVenta/createLiberarCarga.services";
import { getData2} from "../services/pedidoVenta/getDatos.services";
import { getData3} from "../services/pedidoVenta/getDatosXD.services";
import { getOneCamionChapa} from "../services/pedidoVenta/getOne.services";
import { getOneChapa} from "../services/pedidoVenta/getOneChapas.services";
import { getDataInterfoliacion} from "../services/pedidoVenta/getBuilder";
import { getOneData } from "../genericQueries/getOne.services";
import { getData } from "../genericQueries/getBuilder";
import { deleteGardenData } from "../services/delete.services";
import { updateData } from "../services/pedidoVenta/update.services";
import { updateDataCamiones } from "../services/pedidoVenta/updateCamion.services";
import { updateSalidaStoc } from "../services/pedidoVenta/updateSalidaStock.services";
import PedidoVenta from "../interface/pedido_venta";
import Productos from "../interface/productos";
import Stock from "../interface/stock";
import getHistorial from '../services/pedidoVenta/getHistorial';
import getOneCamionChapaHistorial from '../services/pedidoVenta/getOneHistorial.services';
import getOneChapaHistorial from '../services/pedidoVenta/getOneChapasHistorial.services';
import { getOnePedido } from '../services/pedidoVenta/getOnePedido.services';



export const createPedidoVenta = async (req: Request, res: Response) => {
  const tableName = "pedido_venta"; // Reemplaza con el nombre de tu tabla
  const data: Productos = req.body;
  // console.log("datos recibidos controller",data);
  try {
    // Utiliza el servicio para insertar los datos
    const resp = await createData(tableName, data);
    // console.log("respuesta insert",resp)

    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating marcacion:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createCargaPedido = async (req: Request, res: Response) => {
  const tableName = "carga_pedido"; // Reemplaza con el nombre de tu tabla
  const data = req.body;
  // console.log("datos recibidos controller",data);
  try {
    // Utiliza el servicio para insertar los datos
    const resp = await insertDataCarga(tableName, data);
    // console.log("respuesta insert",resp)

    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating marcacion:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createLiberarCarga = async (req: Request, res: Response) => {
  const tableName = "liberar_carga"; // Reemplaza con el nombre de tu tabla
  const data = req.body;
  // console.log("datos recibidos controller",data);
  try {
    // Utiliza el servicio para insertar los datos
    const resp = await insertDataLiberarCarga(tableName, data);
    // console.log("respuesta insert",resp)

    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating marcacion:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getPedidoVenta = async (req: Request, res: Response) => {
  const tableName = "pedido_venta"; // Reemplaza con el nombre de tu tabla
  const { codigo } = req.query; // Extrae los parámetros de la consulta

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

export const getHistorialVenta = async (req: Request, res: Response) => {
  const tableName = "liberar_camiones"; // Reemplaza con el nombre de tu tabla

  try {
    const gardenData = await getHistorial(tableName);
    res.json(gardenData);
  } catch (error) {    
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getCargamento = async (req: Request, res: Response) => {
  const tableName = "cargamento_view"; // Reemplaza con el nombre de tu tabla
  const { codigo } = req.query; // Extrae los parámetros de la consulta

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

export const getLiberarCamion = async (req: Request, res: Response) => {
  const tableName = "liberar_camiones"; // Reemplaza con el nombre de tu tabla

  try {
    const gardenData = await getData3(tableName);
    res.json(gardenData);
  } catch (error) {    
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getLiberarCarga = async (req: Request, res: Response) => {
  const tableName = "liberar_cargaview"; // Reemplaza con el nombre de tu tabla
  // const { codigo } = req.query; // Extrae los parámetros de la consulta

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

export const getPedidoVentaLiberar = async (req: Request, res: Response) => {
  const tableName = "liberar_financiero"; // Reemplaza con el nombre de tu tabla
  const { codigo } = req.query; // Extrae los parámetros de la consulta

  try {
    const gardenData = await getData2(tableName);
    res.json(gardenData);
  } catch (error) {    
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// tu controlador
export const updatePedido = async (req: Request, res: Response) => {
  const tableName = "pedido_venta";
  const newData: PedidoVenta = req.body;
  // console.log("🚀 ~ updatePedido ~ newData:", newData)
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

export const updatePedidoLiberacion = async (req: Request, res: Response) => {
  const tableName = "pedido_venta";
  const newData: PedidoVenta = req.body;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud

  try {
    // await updateData(tableName, id, newData);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateCamiones = async (req: Request, res: Response) => {
  const tableName = "pedido_venta";
  const newData: PedidoVenta = req.body;
  // console.log("🚀 ~ updatePedido ~ newData:", newData)
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud

  try {
    await updateDataCamiones(tableName, id, newData);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOnePedidoVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "cargamento_view"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "PedidoVenta not found" });
    }
  } catch (error) {
    console.error("Error getting garden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getOneNPedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "cargamento_view"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOnePedido(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "PedidoVenta not found" });
    }
  } catch (error) {
    console.error("Error getting garden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const getOneCargaPedido = async (req: Request, res: Response) => {
  const { chapa } = req.params;
  const tableName = "cargamento_view"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneCamionChapa(tableName, chapa);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Cargamento not found" });
    }
  } catch (error) {
    console.error("Error getting garden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getOneCargaPedidoHistorial = async (req: Request, res: Response) => {
  const { chapa } = req.params;
  const tableName = "cargamento_view"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneCamionChapaHistorial(tableName, chapa);

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Cargamento not found" });
    }
  } catch (error) {
    console.error("Error getting garden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getOneChapas = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "carga_pedido"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneChapa(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Chapas not found" });
    }
  } catch (error) {
    console.error("Error getting garden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getOneChapasHistorial = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "carga_pedido"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneChapaHistorial(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Chapas not found" });
    }
  } catch (error) {
    console.error("Error getting garden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getProductoInterfoliacion = async (req: Request, res: Response) => {
  const tableName = "interfoliacion"; // Reemplaza con el nombre de tu tabla
  const colar = req.params.colar;
  const serie = req.params.serie;

  try {
    const userData = await getDataInterfoliacion(tableName, colar, serie);
    // console.log("🚀 ~ getProductoInterfoliacion ~ userData:", userData)
    res.json(userData);
  } catch (error) {
    console.error("Error getting producto data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteGarden = async (req: Request, res: Response) => {
  const tableName = "garden"; // Reemplaza con el nombre de tu tabla
  // const newData = req.body;
  const newData: PedidoVenta = req.body;
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

export const updateVentaStock = async (req: Request, res: Response) => {
  const tableName = "stock";
  const newData: Stock = req.body;
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

export const updateSalidaStock = async (req: Request, res: Response) => {
  // console.log("🚀 ~ updateSalidaStock ~ req.body:", req.body)
  
  const tableName = "stock";
  const newData: Stock = req.body;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud

  try {
    await updateSalidaStoc(tableName, id);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateCargaPedido = async (req: Request, res: Response) => {
  
  const tableName = "carga_pedido";
  const newData = req.body;
  const serie = req.params.serie; // Asumiendo que el id está en los parámetros de la solicitud

  try {
    await updateSalidaStoc(tableName, serie);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};