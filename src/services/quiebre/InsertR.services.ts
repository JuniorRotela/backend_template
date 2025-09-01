
// import { getConnection } from "typeorm";
// import { generateInsertQuery } from "../../genericQueries/insertBuilder";

// export async function insertData(tableName: string, data: Record<string, any>[]): Promise<any> {
//   try {
//     // Obtener la conexión actual
//     const connection = getConnection();

//     // 1. Obtener la última serie de la tabla
//     const lastSerieQuery = `SELECT cod_interno FROM ${tableName} WHERE status_active != 0 ORDER BY id DESC LIMIT 1`;
//     const lastSerieResult = await connection.query(lastSerieQuery);
//     const lastSerie = lastSerieResult.length > 0 ? lastSerieResult[0].serie : "NS000000";

//     console.log("🚀 ~ Última serie encontrada:", lastSerie);

//     // 2. Extraer el número de la última serie utilizando una expresión regular
//     const match = lastSerie.match(/\d+$/); // Extrae solo números al final de la serie
//     const lastSerieNumber = match ? parseInt(match[0], 10) : 0;

//     console.log("🚀 ~ Número de última serie:", lastSerieNumber);

//     // 3. Generar nuevas series
//     const newSeries = Array.from({ length: 1 }, (_, i) => 
//       `NS${(lastSerieNumber + i + 1).toString().padStart(6, "0")}`
//     );

//     console.log("🚀 ~ Nuevas series generadas:", newSeries);
    
//     // Iterar sobre cada objeto en el arreglo
//     const insertedDataArray = [];
//     for (const item of data) {
//       const { cod, descripcion, cantidad, medidas, id_caballete, obs, serie, cantidad_entrada, id_proveedor, id_categoria, id_usuario, id_notafiscal, cod_empresa} = item;
      
//       // Crear el objeto con los datos actualizados y formateados
//       const datosActualizados: Record<string, any> = {
//         cod,
//         descripcion,
//         cantidad,
//         medidas,
//         cod_empresa,
//         id_caballete,
//         obs,
//         serie,
//         cantidad_entrada,
//         id_proveedor,
//         id_categoria,
//         id_usuario,
//         id_notafiscal,
//         cod_interno: newSeries
//       };

//       // Generar la consulta de inserción
//       const insertQuery = generateInsertQuery(tableName, datosActualizados);

//       // Ejecutar la consulta SQL y obtener el resultado de la inserción
//       const result = await connection.query(`${insertQuery} RETURNING *`);
//       const insertedData = result[0];
//       insertedDataArray.push(insertedData);
//     }

//     console.log("All data inserted successfully:", insertedDataArray);
//     return insertedDataArray;

//   } catch (error) {
//     console.error("Error inserting data:", error);
//     throw error;
//   }
// }





// import { getConnection } from "typeorm";
// import { generateInsertQuery } from "../../genericQueries/insertBuilder";

// export async function insertDataRetallo(tableName: string, data: Record<string, any>): Promise<any> {
//   try {

//     console.log("llego", data)
//     // Obtener la conexión actual
//     const connection = getConnection();

//     // // 1. Obtener la última serie de la tabla
//     // const lastSerieQuery = `SELECT cod_interno FROM ${tableName} WHERE status_active != 0 ORDER BY id DESC LIMIT 1`;
//     // const lastSerieResult = await connection.query(lastSerieQuery);
//     // const lastSerie = lastSerieResult.length > 0 ? lastSerieResult[0].cod_interno : "NS0000000";

//     // console.log("🚀 ~ Última serie encontrada:", lastSerie);

//     // // 2. Extraer el número de la última serie utilizando una expresión regular
//     // const match = lastSerie.match(/\d+$/); // Extrae solo números al final de la serie
//     // const lastSerieNumber = match ? parseInt(match[0], 10) : 0;

//     // console.log("🚀 ~ Número de última serie:", lastSerieNumber);

//     // // 3. Generar nuevas series para cada registro
//     // const newSeries = Array.from({ length: data.length }, (_, i) => 
//     //   `NS${(lastSerieNumber + i + 1).toString().padStart(7, "0")}`
//     // );

//     // console.log("🚀 ~ Nuevas series generadas:", newSeries);

//     // Iterar sobre cada objeto en el arreglo
//     const insertedDataArray = [];
//     for (let i = 0; i < data.length; i++) {
//       const item = data[i];
//       const { cod, descripcion, cantidad, medidas,serie, id_caballete, obs, cantidad_entrada, id_proveedor, id_categoria, id_usuario, id_notafiscal, cod_empresa, cod_interno } = data;

//       // Crear el objeto con los datos actualizados y formateados
//       const datosActualizados = {
//         cod,
//         descripcion,
//         cantidad,
//         medidas,
//         cod_empresa,
//         id_caballete,
//         obs,
//         serie,
//         cantidad_entrada,
//         id_proveedor,
//         id_categoria,
//         id_usuario,
//         id_notafiscal,
//         // cod_interno: newSeries[i],
//         cod_interno: cod_interno,

//       };

//       console.log("datos llego en stock", datosActualizados)

//       // Generar la consulta de inserción
//       const insertQuery = generateInsertQuery(tableName, datosActualizados);

//       // Ejecutar la consulta SQL y obtener el resultado de la inserción
//       const result = await connection.query(`${insertQuery} RETURNING *`);
//       const insertedData = result[0];
//       insertedDataArray.push(insertedData);
//     }

//     console.log("All data inserted successfully:", insertedDataArray);
//     return insertedDataArray;

//   } catch (error) {
//     console.error("Error inserting data:", error);
//     throw error;
//   }
// }






import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
// import { format, parseISO } from 'date-fns';
// import getOneMarcacion from "./getOne.services";

export async function insertDataRetallo(tableName: string, data: Record<string, any>): Promise<any> {
  // const { cod, descripcion,dimensiones, cantidad, codigo, serie} = data;

   const { cod, descripcion, cantidad, id_quiebre, medidas,serie, id_caballete, obs, cantidad_entrada, id_proveedor, id_categoria, id_usuario, id_notafiscal, cod_empresa, cod_interno } = data;
  
  //  const descripcionN = descripcion;
  //  const medidasN = medidas;
  //  const codN = cod;
   
   // Paso 1: Eliminar los primeros 2 caracteres y extraer la parte deseada desde el código
   const codDesestructurado = cod.slice(2).split('mm')[0] + 'mm'; // Resultado: 'VD3mm'
   
   // Paso 2: Concatenar el prefijo "RTL-", el código desestructurado y la medida
   const nuevoCod = `RTL-${codDesestructurado}${medidas}`;
   
   // Paso 3: Verificar el resultado
   console.log('Nuevo código:', nuevoCod);
   


// Paso 1: Reemplazar "VIDRO" por "RETALLO"
let nuevaDescripcion = descripcion.replace('VIDRO', 'RETALLO');

// Paso 2: Localizar "mm" y asegurarse de mantenerlo
const indexMM = nuevaDescripcion.indexOf('mm'); // Encuentra la posición de "mm"
if (indexMM !== -1) {
  // Paso 3: Separar hasta "mm" y conservarlo
  nuevaDescripcion = nuevaDescripcion.slice(0, indexMM + 2).trim(); // Conserva hasta "mm"
}

// Paso 4: Agregar las medidas al final
nuevaDescripcion = `${nuevaDescripcion}${medidas}`;

// Paso 5: Verificar el resultado
// console.log('Nueva descripción:', nuevaDescripcion);


  let datosActualizados: Record<string, any> = {
    cod: nuevoCod,
    descripcion: nuevaDescripcion,
    cantidad,
    medidas,
    cod_empresa,
    id_caballete,
    obs,
    serie,
    cantidad_entrada,
    id_proveedor,
    id_categoria,
    id_usuario,
    id_notafiscal,
    // cod_interno: newSeries[i],
    cod_interno: cod_interno,
    id_quiebre: id_quiebre,
    status_active: 1,

  };

  // Generar la consulta de inserción
  // console.log("🚀 ~ insertData ~ datosActualizados:", datosActualizados)
  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL y obtiene el resultado de la inserción
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    // console.log("Data inserted successfully:", insertedData);
    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}