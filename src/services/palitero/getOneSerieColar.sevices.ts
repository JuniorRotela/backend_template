import { getConnection } from "typeorm";
import { insertDaStock } from "../interfoliacion/Insert.services copy";
import { updateDataInterfoliacion } from "../interfoliacion/update.services";
import { updateDataInPalitero } from "./update.services";


export const getOneSerieColarPalitero = async (tableName: string, id:number): Promise<any | null> => {
  try {
    const connection = getConnection();

  let lastSerie = "PCL000000";
let lastSerieNumber = 0;
let lastSerieResult = [];

// Filtra explícitamente por PCL seguido de 6 dígitos
const lastSerieQuery = `
  SELECT colar 
  FROM ${tableName} 
  WHERE colar REGEXP '^PCL[0-9]{6}$' 
  ORDER BY id DESC 
  LIMIT 1
`;

lastSerieResult = await connection.query(lastSerieQuery);

if (lastSerieResult.length > 0) {
    lastSerie = lastSerieResult[0].colar;

    // Extrae el número si la serie es válida
    const match = lastSerie.match(/^PCL(\d{6})$/);
    lastSerieNumber = match ? parseInt(match[1], 10) : 0;
}

console.log("🚀 ~ Última serie PCL encontrada:", lastSerie);
console.log("🚀 ~ Número de última serie PCL:", lastSerieNumber);

// Generar nuevas series
const newSeries = Array.from({ length: 1 }, (_, i) =>
  `PCL${(lastSerieNumber + 1).toString().padStart(6, "0")}`
);




  console.log("🚀 ~ Nuevas series generadas:==============================", newSeries);

//     // 3. Preparar los datos de actualización
    const updateDat = {
      colar: newSeries[0],
      update_at: new Date() // Agregar la fecha de actualización
    };



// Función para eliminar propiedades con valores null/undefined (tipado TypeScript)
const cleanObject = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const cleaned: Partial<T> = { ...obj };
  
  (Object.keys(cleaned) as Array<keyof T>).forEach((key) => {
    if (cleaned[key] === null || cleaned[key] === undefined) {
      delete cleaned[key];
    }
  });
  
  return cleaned;
};

    // 4. Realizar la actualización en la base de datos
    const retornado = await updateDataInPalitero(id, tableName, updateDat);
    console.log("datos retornados", retornado)
  const { colar, cod, descripcion,id_proveedor, id_pvb, id_categoria, cantidad, cod_empresa, update_at, id_caballete, total_peso, medidas, id_usuario} = retornado[0];

 // Crear objeto y limpiarlo
const stockData = cleanObject({
  cod: cod,
  descripcion: descripcion,
  medidas: medidas,
  cantidad: cantidad,
  cantidad_entrada: cantidad,
  serie: colar,
  cod_interno: colar,
  id_caballete: id_caballete,
  id_pvb: id_pvb,
  id_categoria: id_categoria,
  id_usuario: id_usuario,
  id_proveedor: id_proveedor,
  cod_empresa: cod_empresa,
  peso: total_peso,
});

  const insertxd = await insertDaStock("stock",stockData);
   console.log("🚀 ~ getOneSerieColarData ~ insertDaStock:", insertxd)
  // console.log("stockData", stockData)

    return retornado; 

  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
