import { getConnection } from "typeorm";
import { updateDataInterfoliacion } from "./update.services";
import { insertDaStock } from "./Insert.services copy";

export const getOneSerieColarData = async (tableName: string): Promise<any | null> => {
  try {
    const connection = getConnection();

let lastSerie = "CLR000000";
let lastSerieNumber = 0;
let lastSerieResult = [];

// Consulta que selecciona solo series tipo CLR con 6 dígitos
const lastSerieQuery = `
  SELECT colar 
  FROM ${tableName} 
  WHERE colar REGEXP '^CLR[0-9]{6}$' 
  ORDER BY id DESC 
  LIMIT 1
`;

lastSerieResult = await connection.query(lastSerieQuery);

if (lastSerieResult.length > 0) {
  lastSerie = lastSerieResult[0].colar;

  // Extraer el número si cumple con el patrón CLR###### exactamente
  const match = lastSerie.match(/^CLR(\d{6})$/);
  lastSerieNumber = match ? parseInt(match[1], 10) : 0;
}

console.log("🚀 ~ Última serie CLR encontrada:", lastSerie);
console.log("🚀 ~ Número de última serie CLR:", lastSerieNumber);

// Generar nuevas series
const newSeries = Array.from({ length: 1 }, (_, i) =>
  `CLR${(lastSerieNumber + 1).toString().padStart(6, "0")}`
);

console.log("🚀 ~ Nuevas series CLR generadas:", newSeries);

    // 3. Preparar los datos de actualización
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
    const retornado = await updateDataInterfoliacion(tableName, updateDat);
    // console.log("datos retornados", retornado)
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
  id_caballete: 110,
  id_pvb: id_pvb,
  id_categoria: id_categoria,
  id_usuario: id_usuario,
  id_proveedor: id_proveedor,
  cod_empresa: cod_empresa,
  peso: total_peso,
});

  const insertxd = await insertDaStock("stock",stockData);
  //  console.log("🚀 ~ getOneSerieColarData ~ insertDaStock:", insertxd)
  // console.log("stockData", stockData)

    return retornado; 

  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
