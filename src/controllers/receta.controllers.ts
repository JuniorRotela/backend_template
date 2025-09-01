import { Request, Response } from "express";
import { insertData} from "../services/receta/Insert.services";
import { insertReseta} from "../services/receta/insertRecetaInter.services";
// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
// import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/receta/update.services";
import Receta from "../interface/receta";


export const createReceta = async (req: Request, res: Response) => {
  // console.log("datos recibidos controller",req.body);

  const tableName = "receta"; // Reemplaza con el nombre de tu tabla
  const data: Receta = req.body;
  const data1=req.body;

  try {
    // console.log("data desde controlador",data)
    // Utiliza el servicio para insertar los datos
    const resp = await insertData(tableName, data);
    // console.log("respuesta insert",resp)

    data1.data.forEach((item: any) => {
      item.id_receta = resp.id;
    });

    await insertReseta("receta_inter", data1.data);

    res.json({ message: "Data inserted successfully", resp});
  } catch (error) {
    console.error("Error creating marcacion:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};



export const getReceta = async (req: Request, res: Response) => {
  const tableName = "receta"; // Reemplaza con el nombre de tu tabla

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
export const updateReceta = async (req: Request, res: Response) => {
  const tableName = "receta";
  const newData: Receta = req.body;
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


export const getOneReceta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tableName = "receta"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOneData(tableName, parseInt(id, 10));

    if (Data) {
      res.json(Data);
    } else {
      res.status(404).json({ message: "Receta not found" });
    }
  } catch (error) {
    console.error("Error getting Receta data:", error);

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