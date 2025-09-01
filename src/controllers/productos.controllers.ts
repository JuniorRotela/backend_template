import { Request, Response } from "express";
import { insertData} from "../services/productos/Insert.services";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import {getProveedorProduct} from "../services/productos/getOne.services";
import { getData } from "../genericQueries/getBuilder";
import { deleteGardenData } from "../services/delete.services";
import { getDataF } from "../services/productos/getDatos.services";
import { updateData } from "../services/descuento/update.services";
// import Category from "../interface/category";
import Descuento from "../interface/descuento";
// import HorasExtras from "../interface/horasExtras";
// import Metas from "../interface/metas";
import Productos from "../interface/productos";
import { getDataLaminado } from "../services/productos/getDatosLaminados.services";


export const createProducto = async (req: Request, res: Response) => {
  const tableName = "productos"; // Reemplaza con el nombre de tu tabla
  const data: Productos = req.body;
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

export const getCategorias = async (req: Request, res: Response) => {
  const tableName = "categorias"; // Reemplaza con el nombre de tu tabla

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

// export const getProductos = async (req: Request, res: Response) => {
//   const tableName = "productos"; // Reemplaza con el nombre de tu tabla

//   try {
//     const userData = await getDataF(tableName);
//     res.json(userData);
//   } catch (error) {
//     console.error("Error getting product data:", error);

//     if (error instanceof Error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };

export const getProductoProveedor = async (req: Request, res: Response) => {
  const tableName = "productos"; // Reemplaza con el nombre de tu tabla
  const id = req.params.id;
  const id_categoria = req.params.id_categoria;
  console.log("🚀 ~ getProductoProveedor ~ id:", id)

  try {
    const userData = await getProveedorProduct(tableName, parseInt(id, 10), parseInt(id_categoria));
    res.json(userData);
  } catch (error) {
    console.error("Error getting precio data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getProductos = async (req: Request, res: Response) => {
  const tableName = "productos"; // Reemplaza con el nombre de tu tabla
  const { codigo } = req.query; // Extrae los parámetros de la consulta

  try {
    // Convierte a número y valida que sea 0 o 1
    const codigoNumber = typeof codigo === 'string' ? Number(codigo) : undefined;
    // console.log("🚀 ~ getProductos ~ codigoNumber:", codigoNumber)

    if (codigoNumber !== undefined && (codigoNumber < 0 || codigoNumber > 1)) {
      return res.status(400).json({ message: 'El código debe ser 0 o 1.' });
    }

    const userData = await getDataF(tableName, codigoNumber);
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
    const userData = await getDataF(tableName);
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
    const gardenData = await getDataF(tableName);
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

export const getOneProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "productos"; // Reemplaza con el nombre de tu tabla

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