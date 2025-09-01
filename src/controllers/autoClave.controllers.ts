
import { Request, Response } from "express";
import { insertData} from "../services/autoClave/Insert.services";
import { insertDataLog} from "../services/autoClave/InsertLog.services";
// import {getLastFileData } from "../services/autoClave/getAutoClave.services";
import {monitorFileData } from "../services/autoClave/getAutoClave.services";
import  getsAutoclavebynumber from "../services/autoClave/getLogAutoClave";

// import Garden from "../interface/garden";
import { getOneData } from "../genericQueries/getOne.services";
import { deleteGardenData } from "../services/delete.services";
import { getData } from "../genericQueries/getBuilder";
import { updateData } from "../services/autoClave/update.services";
// import Category from "../interface/category";
// import Descuento from "../interface/descuento";
// import HorasExtras from "../interface/horasExtras";
import AutoClave from "../interface/autoClave";
import { getLastFile } from "../services/autoClave/getUltimaReceta.services";
import  getOne from "../services/autoClave/getOne.services";

// export const createAutoClave = async (req: Request, res: Response) => {
//   const tableName = "autoClave"; // Reemplaza con el nombre de tu tabla
//   const data: AutoClave = req.body;

//   // console.log("datos recibidos controller",data);
//   try {
//     const resp = await insertData(tableName, data);
//     const newData = {
//       resp.id,
//       estado: data.estado
//     }
//     updateData("caballete", parseInt(resp.primerCaballete), newData)

//     if(resp.segundoCaballete != 163){
//       const newData = {
//         resp.id,
//         estado: data.estado
//       }
//       updateData("caballete", parseInt(resp.segundoCaballete), newData)
//     }

//     res.json({ message: "Data inserted successfully", resp});
//   } catch (error) {
//     console.error("Error creating marcacion:", error);

//     if (error instanceof Error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };

export const createAutoClave = async (req: Request, res: Response) => {
  const tableName = "autoClave";
  const autoClaveData: AutoClave = req.body;
  console.log("🚀 ~ createAutoClave ~ autoClaveData:", autoClaveData)

  try {
    const inserted = await insertData(tableName, autoClaveData);

    if (!inserted || !inserted.id || !inserted.primerCaballete || !inserted.segundoCaballete) {
      return res.status(500).json({ message: "Datos incompletos devueltos desde insertData." });
    }

    const updatePayload = {
      estado: autoClaveData.estado,
      id_autoclave: inserted.id,
    };

    // Actualiza el primer caballete
    await updateData("caballete", parseInt(inserted.primerCaballete), updatePayload);

    // Actualiza el segundo caballete si no es el valor especial 163
    const segundoCaballeteId = parseInt(inserted.segundoCaballete);
    if (segundoCaballeteId !== 163) {
      await updateData("caballete", segundoCaballeteId, updatePayload);
    }

    res.status(201).json({ message: "Autoclave creada correctamente", data: inserted });

  } catch (error) {
    console.error("Error al crear autoclave:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({ message: errorMessage });
  }
};


export const postLogAutobyClave = async (req: Request, res: Response) => {
  console.log("🚀 ~ getLogAutobyClave ~ data:", req.body)

  const data = req.body;
  const numero = data.numero;

  try {
    const gardenData = await getsAutoclavebynumber(numero);
    res.json(gardenData);
  } catch (error) {    
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getAutoClave = async (req: Request, res: Response) => {
  const tableName = "autoClave"; // Reemplaza con el nombre de tu tabla

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

export const getAutoClaveLog = async (req: Request, res: Response) => {
  const tableName = "log_autoclave"; // Reemplaza con el nombre de tu tabla

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

export const getAutoClaveLogDes = async (req: Request, res: Response) => {
  const tableName = "autoclave_logview"; // Reemplaza con el nombre de tu tabla

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

export const getlog = async (req: Request, res: Response) => {
  const tableName = "log_autoclave"; // Reemplaza con el nombre de tu tabla

  try {
    const userData = await monitorFileData();
    res.json(userData);
  } catch (error) {
    console.error("Error getting product data:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


// export const getAutoClaveHistorial = async (req: Request, res: Response) => {
//   try {
//     const userData = await monitorFileData();

//     if (!userData) {
//       console.error('❌ No se encontraron datos.');
//       return res.status(404).json({ message: 'No se encontraron datos en el archivo.' });
//     }

//     // console.log('📊 Datos obtenidos:', JSON.stringify(userData, null, 2));

//     res.json(userData);

//     // Insertar en la base de datos
//     insertDataLog("log_autoclave", userData).catch(err =>
//       console.error("❌ Error insertando en la base de datos:", err)
//     );
//   } catch (error: any) {
//     console.error('❌ Error al obtener datos del autoclave:', error);
//     return res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };




// Controlador Express para obtener el historial del autoclave
export const getAutoClaveHistorial = async (req: Request, res: Response) => {
  try {
    const userData = await getLastFile();

    if (!userData) {
      console.error('❌ No se encontraron datos.');
      return res.status(404).json({ message: 'No se encontraron datos en el archivo.' });
    }

    // console.log('📊 Datos obtenidos:', JSON.stringify(userData, null, 2));


    res.json(userData);
    insertDataLog("log_autoclave", userData).catch(err =>
      console.error("Error inserting data log:", err)
    );
  } catch (error: any) {
    console.error('❌ Error al obtener datos del autoclave:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};


// Controlador Express para obtener el historial del autoclave
export const getLastRecipe = async (req: Request, res: Response) => {
  try {
    const userData = await getLastFile();

    if (!userData) {
      console.error('❌ No se encontraron datos.');
      return res.status(404).json({ message: 'No se encontraron datos en el archivo.' });
    }

    // console.log('📊 Datos obtenidos:', JSON.stringify(userData, null, 2));


    res.json(userData);
    insertDataLog("log_autoclave", userData).catch(err =>
      console.error("Error inserting data log:", err)
    );
  } catch (error: any) {
    console.error('❌ Error al obtener datos del autoclave:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};



// tu controlador
export const updateAutoClave = async (req: Request, res: Response) => {
  const tableName = "autoClave";
  const newData: AutoClave = req.body;
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


export const getOneAutoClave = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("🚀 ~ getOneAutoClave ~ req.params:", req.body)
  const tableName = "autoClave"; // Reemplaza con el nombre de tu tabla

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

export const getOneProceso = async (req: Request, res: Response) => {

  const { id } = req.params;
  const tableName = "log_autoclave"; // Reemplaza con el nombre de tu tabla

  try {
    const Data = await getOne(tableName, parseInt(id, 10));

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