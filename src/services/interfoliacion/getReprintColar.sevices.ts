import { getConnection } from "typeorm";
import { updateDataInterfoliacion } from "./update.services";
import { insertDaStock } from "./Insert.services copy";
import { getDataReprintColar } from "./getDatosReprintColar";
import { getDataSerieColar } from "./getSerieColar";

export const getOneSerieReprintColar = async (tableName: string): Promise<any | null> => {
  try {
    const connection = getConnection();

    // 1. Buscar la última serie activa en la base de datos en el formato CLR000001
    let lastSerie = "CLR000000";
    let lastSerieNumber = 0;
    let lastSerieResult = [];

    do {
      const lastSerieQuery = `SELECT colar FROM ${tableName} WHERE colar != '0' ORDER BY id DESC LIMIT 1`;
      lastSerieResult = await connection.query(lastSerieQuery);

      if (lastSerieResult.length > 0) {
        lastSerie = lastSerieResult[0].colar;
      }
      
      // Verificar si el último registro no es '0'
      if (lastSerie !== '0') {
        const match = lastSerie.match(/\d+$/);
        lastSerieNumber = match ? parseInt(match[0], 10) : 0;
      }
    } while (lastSerie === '0' && lastSerieResult.length > 0);

     console.log("🚀 ~ Última serie encontrada:", lastSerie);
     console.log("🚀 ~ Número de última serie:", lastSerieNumber);

    // // 2. Generar nuevas series
    // const newSeries = Array.from({ length: 1 }, (_, i) => 
    //   `CLR${(lastSerieNumber + 1).toString().padStart(6, "0")}`
    // );

    // // console.log("🚀 ~ Nuevas series generadas:", newSeries);

    // // 3. Preparar los datos de actualización

    const getdat = await getDataSerieColar(lastSerie);
    // console.log("🚀 ~ Datos obtenidos:", getdat);

    return getdat[0];
    
    
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
