import { Request, Response } from "express";
import { insertData} from "../services/reporteCalandra/Insert.services";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { getDataDesc } from "../services/reporteCalandra/getDesc";
import { updateData } from "../services/horasExtras/update.services";
import getOneDta from "../services/reporteCalandra/getOneSerie.services";

// import Category from "../interface/category";
// import Descuento from "../interface/descuento";
// import HorasExtras from "../interface/horasExtras";
import ReporteCalandra from "../interface/reporteCalandra";
import { getOneDataPackCab } from "../services/cargadora/getOnePaqueteCab.services";


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

export const PostReporteCalandraSK = async (data: ReporteCalandra) => {
  // console.log("🚀 ~ PostReporteCalandraSK ~ data:", data)
  const tableName = "reportecalandra";
  try {
    const resp = await insertData(tableName, data);
//  console.log("esta es la respuesta xd", resp)
    return resp;
  } catch (error) {
    console.error("Error creating reporteSalaLimpia in DB:", error);
    throw error;
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

export const getReporteCalandra = async (req: Request, res: Response) => {
  const tableName = "reportecalandra"; // Reemplaza con el nombre de tu tabla

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


export const getReportecalandra = async (req: Request, res: Response) => {
  const tableName = "reporte_calandra"; // Reemplaza con el nombre de tu tabla

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


// export const getOneProblemaCalandra = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const tableName = "problemacalandra"; // Reemplaza con el nombre de tu tabla

//   try {
//     const Data = await getOneData(tableName, parseInt(id, 10));

//     if (Data) {
//       res.json(Data);
//     } else {
//       res.status(404).json({ message: "Problema Calandra not found" });
//     }
//   } catch (error) {
//     console.error("Error getting Problema Calandra data:", error);

//     if (error instanceof Error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// };
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
export const updateReporteCalandra = async (req: Request, res: Response) => {
  const tableName = "reportecalandra";
  const newData: ReporteCalandra = req.body;
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


export const getOneReporteCalandra = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "reportecalandra"; // Reemplaza con el nombre de tu tabla

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
      res.status(404).json({ message: "Problema Calandra not found" });
    }
  } catch (error) {
    console.error("Error getting Problema Calandra data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const getOnePaqueteCargadoraxdxd = async (req: Request, res: Response) => {

  // console.log("entro a getOnePaqueteCargadoraxdxd")
  const { id } = req.params;
  const tableName = "stock"; // Reemplaza con el nombre de tu tabla
  // console.log("id",id)
  try {
    const Data = await getOneDataPackCab(tableName, parseInt(id, 10));
    res.json(Data);

  } catch (error) {
    console.error("Error getting Problema Cargadora data:", error);

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

export const getMotivoCalandra = async (req: Request, res: Response) => {
  const tableName = "motivoscomunes"; // Reemplaza con el nombre de tu tabla

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