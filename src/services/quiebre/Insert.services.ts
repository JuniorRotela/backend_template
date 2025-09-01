import { updateStock } from './../../controllers/stock.controllers';
import { isDate } from 'date-fns';
// import { data } from 'cheerio/dist/commonjs/api/attributes';
import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import { insertIntData } from "./InsertInt.services";
import getOne from "../stock/getCodInterno.services";
import getOneStockQuiebre from './getCodInterno.services';
import { updateDataQuiebre } from './update.services';
import { insertDataRetallo } from './InsertR.services';
// import { format, parseISO } from 'date-fns';
// import getOneMarcacion from "./getOne.services";

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
   const { cod_paquete, cantidad_retallo, sector, motivo, id_proveedor, cod_empresa, id_usuario, imagen} = data;
   const  descuentoChapa = 1;
  //  console.log("=======================================>recibidos",data);
  
  let datosActualizados: Record<string, any> = {
  cod_paquete: cod_paquete,
  cantidad_retallo: cantidad_retallo,
  sector: sector,
  motivo: motivo,
  id_proveedor: id_proveedor,
  cod_empresa: cod_empresa,
  id_usuario: id_usuario,
  imagen: imagen
  };


  let datosActualizadosInt: Record<string, any> = {
    ...data.data
  };
  

  const productData = await getOneStockQuiebre("stock", cod_paquete);
  const {id, cantidad_entrada, cod, cod_interno, id_notafiscal, descripcion} = productData;
  const  descuento = cantidad_entrada - descuentoChapa;
  const id_categoria = 4;
//  console.log("=======================================>datos del producto",productData);
  // console.log("=======================================>descuento",descuento);

  const updateData = {
    cantidad_entrada: descuento
  }

 

const updateStock = await updateDataQuiebre("stock", id, updateData); 
// console.log("=======================================>updateresponse",updateStock);
    // Convertir el arreglo de datos anidados a una cadena JSON
    // datosActualizados.data = JSON.stringify(data.data);



  // Generar la consulta de inserción
  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {
    // Obtiene la conexión actual
    const connection = getConnection();




    // Ejecuta la consulta SQL y obtiene el resultado de la inserción
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    const { id, cod_empresa, id_usuario, motivo} = insertedData;


    datosActualizadosInt = {
      ...datosActualizadosInt,
      id_quiebre: id,
      cod_empresa: cod_empresa,
      id_usuario: id_usuario,
 
    };

    const  insertInt = await insertIntData("quiebra_intermedio", datosActualizadosInt);

    //  console.log("intermedio devuelto:", insertInt);

     const dataStockArray = insertInt.map((insertedItem: {
       cod_empresa: any; id_usuario: any; serie: any; medida:any; id_caballete:any;}) => ({
      cod: cod, // Asegúrate de que 'cod' esté definido en este alcance
      descripcion: descripcion,
      cantidad: 1,
      medidas: insertedItem.medida,
      id_caballete:insertedItem.id_caballete,
      obs: motivo,
      cod_empresa: insertedItem.cod_empresa, // Utiliza el cod_empresa del objeto insertado
      serie: cod_interno, // Incluye la serie del objeto insertado,
      cantidad_entrada: 1,
      id_proveedor: id_proveedor, // Asegúrate de que 'id_proveedor' esté definido
      id_categoria: id_categoria, // Asegúrate de que 'id_categoria' esté definido
      // id_pvb: id_pvb,
      id_clasificacion: 3,
      id_usuario: insertedItem.id_usuario, // Utiliza el id_usuario del objeto insertado
      id_notafiscal: id_notafiscal, // Asegúrate de que 'id_notafiscal' esté definido
      cod_interno: insertedItem.serie, // Asegúrate de que 'cod_inteno' esté definido
      id_quiebre: id,
    }));
     
    // console.log("datos para stock", dataStockArray)
     // Realizar las inserciones en la tabla 'stock' utilizando los datos generados
     for (const dataStock of dataStockArray) {
       const submitStock = await insertDataRetallo("stock", dataStock);
      //  console.log("inserted stock data:", submitStock);
     }

    // console.log("Data inserted successfully:", insertedData);
    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}