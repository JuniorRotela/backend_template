import { Request, Response } from "express";
import { insertData} from "../services/reporteInterfoliacion/Insert.services";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { getDataDesc } from "../services/reporteInterfoliacion/getDesc";
import { updateData } from "../services/horasExtras/update.services";
import getOneDta from "../services/reporteInterfoliacion/getOneSerie.services";

// import Category from "../interface/category";
// import Descuento from "../interface/descuento";
// import HorasExtras from "../interface/horasExtras";
import ReporteInterfoliacion from "../interface/reporteInterfoliacion";
import getReporteInterfoliacionbyFecha from "../services/reporteInterfoliacion/getReporteInterfoliacion";


export const getOneSerie = async (req: Request, res: Response) => {
  const { serie } = req.params;
  const tableName = "interfoliacion"; // Reemplaza con el nombre de tu tabla

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


export const createReporteInterfoliacion = async (req: Request, res: Response) => {

  const tableName = "reporte_interfoliacion"; // Reemplaza con el nombre de tu tabla
  const data: ReporteInterfoliacion = req.body;
  try {
    const resp = await insertData(tableName, data);
    res.json({ message: "Data inserted successfully", resp});

  } catch (error) {
    console.error("Error creating marcacion:", error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getProblemaCalandra = async (req: Request, res: Response) => {
  const tableName = "problemacalandra"; // Reemplaza con el nombre de tu tabla

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

export const getReporteInterfoliacion = async (req: Request, res: Response) => {
  const tableName = "reporte_interfoliacion"; // Reemplaza con el nombre de tu tabla
  const data = req.body;
  // console.log("🚀 ~ getProduccionView ~ data:", data)
  const fecha = data.fecha;
  //  console.log("🚀 ~ getProduccionView ~ fecha:", fecha)
  try {
    const Data = await getReporteInterfoliacionbyFecha(fecha);
    res.json(Data);
  } catch (error) {
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getReporteinterfoliacionv = async (req: Request, res: Response) => {
  const tableName = "vista_calandra_interfoliacion"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getDataDesc(tableName);
    res.json(userData);
  } catch (error) {
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getReporte = async (req: Request, res: Response) => {
  const tableName = "reporte_interfoliacion"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getDataDesc(tableName);
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
export const updateReporteInterfoliacion = async (req: Request, res: Response) => {
  const tableName = "reporte_interfoliacion";
  const newData: ReporteInterfoliacion = req.body;
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


export const getOneReporteInterfoliacion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "reporte_interfoliacion"; // Reemplaza con el nombre de tu tabla

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

export const getOneProblemaCalandra = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "problemacalandra"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Problema Interfoliacion not found" });
    }
  } catch (error) {
    console.error("Error getting Problema Interfoliacion data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

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
