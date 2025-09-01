
import { Request, Response } from "express";
import { insertData} from "../services/reporteStock/Insert.services";
import { insertDataAndSendEmail } from "../services/reporteStock/sendGmail.services";

// import Garden from "../interface/garden";
// import { getOneData } from "../services/reporteStock/getOneDatos.services";
import getOneData from "../services/reporteStock/getOneDatos.services"
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/horasExtras/update.services";
// import Category from "../interface/category";
// import Descuento from "../interface/descuento";
// import HorasExtras from "../interface/horasExtras";
import ReporteStock from "../interface/reporteStock";
import getOneDta from "../services/reporteStock/getOne.services";


// import { Request, Response } from "express";
// import { insertData } from "../path_to_your_database_helpers"; // Asegúrate de apuntar a tu función de inserción
// import { ReporteStock } from "../models/reporteStock"; // Asegúrate de tener el modelo adecuado para ReporteStock
// import { io } from "../app"; // Si estás usando Socket.IO, asegúrate de que esto apunte a tu instancia de Socket.IO

export const createReporteStock = async (req: Request, res: Response) => {
  const tableName = "reportestock"; // Nombre de tu tabla
  const data: ReporteStock = req.body; // Obtén los datos del body de la solicitud
  // console.log("Datos recibidos en el controlador:", data);
  try {
    // Inserta los datos en la base de datos usando la función `insertData`
    const resp = await insertData(tableName, data);

    // Emite un evento de Socket.IO si estás utilizando la sincronización en tiempo real
    // if (io) {
    //   io.emit("newReporteStock", data); // Emitir los datos a todos los sectores conectados
    // }

    res.status(201).json({ message: "Reporte de Stock creado con éxito", resp });
  } catch (error) {
    console.error("Error creando el reporte de Stock:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: "Error desconocido al crear el reporte" });
  }
};


export const sendGmailStock = async (req: Request, res: Response) => {
  const tableName = "defecto"; // Nombre de tu tabla
  const data: ReporteStock = req.body; // Obtén los datos del body de la solicitud
  // console.log("Datos recibidos en el controlador:", data);
  try {
    // Inserta los datos en la base de datos usando la función `insertData`
    const resp = await insertDataAndSendEmail(tableName, data);

    // Emite un evento de Socket.IO si estás utilizando la sincronización en tiempo real
    // if (io) {
    //   io.emit("newReporteStock", data); // Emitir los datos a todos los sectores conectados
    // }

    res.status(201).json({ message: "Reporte de Stock creado con éxito", resp });
  } catch (error) {
    console.error("Error creando el reporte de Stock:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: "Error desconocido al crear el reporte" });
  }
};

// export const createReporteStock = async (req: Request, res: Response) => {
//   const tableName = "reporteStock"; // Reemplaza con el nombre de tu tabla
//   const data: ReporteStock = req.body;
//   console.log("datos recibidos controller",data);
//   try {
//     // console.log("data desde controlador",data)
//     // Utiliza el servicio para insertar los datos
//     const resp = await insertData(tableName, data);
//     // console.log("respuesta insert",resp)

//     res.json({ message: "Data inserted successfully", resp});
//   } catch (error) {
//     console.error("Error creating marcacion:", error);

//     if (error instanceof Error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };

export const getOneStock = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "reportelavadora"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Reporte Stock not found" });
    }
  } catch (error) {
    console.error("Error getting garden data:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const getReportestock = async (req: Request, res: Response) => {
  const tableName = "reporte_stock"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await getData(tableName);

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No se encontraron reportes de stock" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error al obtener los reportes de stock:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Error desconocido al obtener los reportes" });
  }
};


// export const getReportestock = async (req: Request, res: Response) => {
//   const tableName = "reporte_stock"; // Reemplaza con el nombre de tu tabla

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

export const getProblemaStock = async (req: Request, res: Response) => {
  const tableName = "problemadescarga"; // Reemplaza con el nombre de tu tabla

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

export const getReporteStock = async (req: Request, res: Response) => {
  const tableName = "reportestock"; // Reemplaza con el nombre de tu tabla

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
export const updateReporteStock = async (req: Request, res: Response) => {
  const tableName = "reportestock";
  const newData: ReporteStock = req.body;
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



export const getOneReporteStock = async (req: Request, res: Response) => {
  const { serie } = req.params;
  const tableName = "reportestock"; // Reemplaza con el nombre de tu tabla

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