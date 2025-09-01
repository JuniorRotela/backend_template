import { response } from 'express';
import { getConnection } from "typeorm";
import { insertDaStock } from "../interfoliacion/Insert.services copy";
import { updateDataInterfoliacion } from "../interfoliacion/update.services";
import { updateDataInPalitero } from "./update.services";
import { generateUpdateQueryColarP } from "./updateColar";
import { get } from 'http';
import { getDataSerieColar } from '../interfoliacion/getSerieColar';
import { getPaliteroxdColar } from './getPaliteroColar';


export const getOneSerieColarRep = async (tableName: string, id:number): Promise<any | null> => {
  try {
    const connection = getConnection();



    
const getColar = await getPaliteroxdColar(tableName, id)
// console.log("🚀 ~ getOneSerieColarRep ~ getColar", getColar[0])
const colar = getColar[0].colar

const response = await getDataSerieColar(colar)
 console.log("🚀 ~ getOneSerieColarRep ~ response:", response)
// console.log("🚀 ~ getOneSerieColarRep ~ colar:", colar)
//   // Buscar la última serie activa en la base de datos con formato PCL000000
   return response[0]; 

  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
