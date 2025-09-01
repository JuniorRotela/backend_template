import { Request, Response } from "express";
import { insertData} from "../services/reporteSalaLimpia/Insert.services";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
// import { updateData } from "../services/reporteSalaLimpia/updateSL.services";
// import Category from "../interface/category";
// import Descuento from "../interface/descuento";
// import HorasExtras from "../interface/horasExtras";
import {updateProblema} from "../services/reporteSalaLimpia/update.services";
import ReporteSalaLimpia from "../interface/reporteSalaLimpia";


export const createReporteSalaLimpia = async (req: Request, res: Response) => {
  const tableName = "reportesalalimpia"; // Reemplaza con el nombre de tu tabla
  const data: ReporteSalaLimpia = req.body;
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

export const getProblemaSalaLimpia = async (req: Request, res: Response) => {
  const tableName = "problemasalalimpia"; // Reemplaza con el nombre de tu tabla

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

export const getReportesalalimpia = async (req: Request, res: Response) => {
  const tableName = "reporte_salalimpia"; // Reemplaza con el nombre de tu tabla
  
  try {
    const userData = await getData(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting vista Salalimpia data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
export const getReporteSalaLimpia = async (req: Request, res: Response) => {
  const tableName = "reportesalalimpia"; // Reemplaza con el nombre de tu tabla

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
// export const getDescuentosView = async (req: Request, res: Response) => {
//   const tableName = "descuentosview"; // Reemplaza con el nombre de tu tabla

//   try {
//     const userData = await getData(tableName);
//     res.json(userData);
//   } catch (error) {
//     console.error("Error getting product data:", error);

//     if (error instanceof Error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };

// export const getProductView = async (req: Request, res: Response) => {
//   const tableName = "productView"; // Reemplaza con el nombre de tu tabla

//   try {
//     const gardenData = await getData(tableName);
//     res.json(gardenData);
//   } catch (error) {    
//     console.error("Error getting product data:", error);

//     if (error instanceof Error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };
// tu controlador

export const updateReporteSalaLimpia = async (req: Request, res: Response) => {
  const tableName = "reportesalalimpia";
  const newData: ReporteSalaLimpia = req.body;
  const id = req.params.id; // Asumiendo que el id está en los parámetros de la solicitud

  try {
    await updateProblema(tableName, id, newData);

    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getOneReporteSalaLimpia = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "reportesalalimpia"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "AutoClave not found" });
    }
  } catch (error) {
    console.error("Error getting AutoClave data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


// // import { updateData } from "../../services/reporteSalaLimpia/Update.services";
// import SalaLimpia from "../interface/reporteSalaLimpia";

// // Función reutilizable para actualizar un registro de Sala Limpia en la base de datos
// export const UpdateReporteSalaLimpia = async (data: SalaLimpia) => {
//   const tableName = "reportesalalimpia";
//   try {
//     const resp = await updateData(tableName, data);
//     // console.log("Respuesta de actualización:", resp);
//     return resp;
//   } catch (error) {
//     console.error("Error actualizando reporteSalaLimpia en DB:", error);
//     throw error;
//   }
// };

// export const deleteGarden = async (req: Request, res: Response) => {
//   const tableName = "garden"; // Reemplaza con el nombre de tu tabla
//   // const newData = req.body;
//   const newData: AutoClave = req.body;
//   const id = req.params;

//   try {
//     await deleteGardenData(tableName, newData, id);

//     res.json({ message: "Data delete successfully", newData });
//   } catch (error) {
//     console.error("Error deleting garden data:", error);

//     if (error instanceof Error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };

