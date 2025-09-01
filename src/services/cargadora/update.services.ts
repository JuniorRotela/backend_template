
import { updateOrdenDat } from './updateOrden.services';
import { updateChapa } from './updateChapa.services';
import { getManager } from 'typeorm';
import { generateUpdateQuery } from '../../services/reporteLavadora/updateBuilder';
import { getVerificar } from '../../controllers/ordenProduccion.controllers';
import { getVerificarStock } from '../ordenProduccion/getVerificarStock.services';
import getOnePaquete from './getOne.services';
import {updateData2} from '../stock/update.services'
import getOnePaquet from './getOnePaquet.services';
import { error } from 'console';
import { channel } from 'diagnostics_channel';


export const updateDataOrden = async (tableName: string, id: any, newData: any): Promise<any> => {
  try {
    const entityManager = getManager();
    const update_at = new Date();
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", newData);
    
  let {
      caballete1,
      caballete2,
      caballete3,
      caballete4,
      orden,
      cod,
      cantidad_total,
      Estado,
      estado_calandra,
      pvb,
      serie,
      chapa1,
      chapa2,
      llave = 0, // esto solo cubre undefined, no null
      ...restData
    } = newData;
    
    llave = llave ?? 0; // esto asegura que si viene null o undefined, sea 0

    
    const updateDataT = {
      // ...newData,
      update_at,
      caballete1,
      caballete2,
      // caballete3,
      // caballete4,
      estado:Estado,
      estado_calandra:estado_calandra,
      pvb: pvb
    };


    const updateDataO = {
      // ...newData,
      update_at,
      // caballete1,
      // caballete2,
      // caballete3,
      // caballete4,
      estado:Estado,
      estado_calandra:estado_calandra,
      pvb: pvb
    };

    const objetoPerdido = {
      update_at,
      estado:3,
      estado_calandra:estado_calandra,
      pvb: pvb,
      chapa1: chapa1,
      chapa2: chapa2,
    };

  //  console.log("estado calandra xdxd",Estado)
  //console.log("llave",llave)
   if(Estado === 2 && llave === 0){
    const paquete = await  getOnePaquet("productos", cod, parseInt(llave) );
     console.log("paquete xd =================================>",paquete)

    // Si caballete1 es null, undefined o un string vacío, usa caballete2
caballete1 = caballete1?.trim() ? caballete1 : caballete2;

// Si caballete2 es null, undefined o un string vacío, usa caballete1
caballete2 = caballete2?.trim() ? caballete2 : caballete1;


       const verifyCod1 = await getOnePaquete("stock", caballete1);
        console.log("paquete master2 <=================================",verifyCod1.cod)

       const verifyCod2 = await getOnePaquete("stock", caballete2);
         console.log("paquete master <=================================",verifyCod2.cod)



try {
  if(paquete.paquete2 === verifyCod1.cod && paquete.paquete3 === verifyCod2.cod){
    // console.log("si coinciden")
    const updateOrden = await updateOrdenDat(tableName, orden, Estado, updateDataT);
    // console.log("Cantidad total",updateOrden)
    // orden de los factores no altera el producto
   }else{
    // throw new Error("La Orden no Coinside con el paquete");
    console.log("orden de los factores altera el producto")
   }

} catch (error) {
  
}
    
try {
  // Segunda verificación en caso de error
  if (paquete.paquete3 === verifyCod2.cod && paquete.paquete2 === verifyCod1.cod) {
    const updateOrden = await updateOrdenDat(tableName, orden, Estado, updateDataT);
  } else {
    throw new Error("La Orden sigue sin coincidir con el paquete en la segunda verificación");
  }
} catch (error) {
  // console.error("Error en la segunda validación:", error.message);
  // throw new Error("La Orden sigue sin coincidir con el paquete en la segunda verificación");
}

try {
  // Segunda verificación en caso de error
  if (llave === 1) {
    const updateOrden = await updateOrdenDat(tableName, orden, Estado, updateDataT);
  } 
} catch (error) {
  // console.error("Error en la segunda validación:", error.message);

}

      
   }
   

   else if(Estado === 2 && llave === 1){
    try {
      // Segunda verificación en caso de error
      if (llave === 1) {
    
    
        console.log("llave 1", llave)
      
          
        const paquete = await  getOnePaquet("productos", cod , llave );
        //  console.log("paquete xd =================================>",paquete)

        //  const {codxd = cod, paquete2, paquete3} = paquete;
        //  console.log("cod xdxd =================================>",codxd, paquete2, paquete3)
    
        // Si caballete1 es null, undefined o un string vacío, usa caballete2
    caballete1 = caballete1?.trim() ? caballete1 : caballete2;
    
    // Si caballete2 es null, undefined o un string vacío, usa caballete1
    caballete2 = caballete2?.trim() ? caballete2 : caballete1;
    
    
          //  const verifyCod1 = await getOnePaquete("stock", caballete1);
          //   console.log("paquete master2 <=================================",verifyCod1.cod)
    
          //  const verifyCod2 = await getOnePaquete("stock", caballete2);
          //    console.log("paquete master <=================================",verifyCod2.cod)
    
    


          const verifyCod1 = await getOnePaquete("stock", caballete1);
          console.log("verifyCod1 de cargadora 1 <=================================",verifyCod1.cod)
  
         const verifyCod2 = await getOnePaquete("stock", caballete2);
           console.log("verifyCod2 de cargadora2 <=================================",verifyCod2.cod)

         const cargadora1format = verifyCod1.cod;
         const cargadora2format = verifyCod2.cod;


  


             const { codxd = cod, paquete2, paquete3 } = paquete;

            //  console.log("cod xdxd =================================>",codxd, paquete2, paquete3)
            console.log("===============================Paquete para comparar", paquete)

             // 1. Quitar "G-" si lo tiene
            //  const codSinPrefijo = codxd.startsWith("G-") ? codxd.slice(2) : codxd;
            const codSinPrefijo = (codxd.startsWith("G-") || codxd.startsWith("A-")) ? codxd.slice(2) : codxd;
             // 2. Extraer partes necesarias
             const codInicio = codSinPrefijo.slice(0, 3);
             const codResto = codSinPrefijo.slice(3);
             const paquete3Inicio = paquete3?.slice(0, 4);
             console.log("codInicio", codInicio);
             console.log("codResto", codResto);
             console.log("paquete3Inicio", paquete3Inicio);

             

             const Paquete1SinPrefijo = (cargadora1format.startsWith("G-") || cargadora1format.startsWith("A-")) ? cargadora1format.slice(2) : cargadora1format;
             const Paquete2SinPrefijo = (cargadora2format.startsWith("G-") || cargadora2format.startsWith("A-")) ? cargadora2format.slice(2) : cargadora2format;
             
             console.log("Paquete1SinPrefijo", Paquete1SinPrefijo)
             console.log("Paquete2SinPrefijo", Paquete1SinPrefijo)

            //  // 3. Validar paquete2
            //  if (!Paquete1SinPrefijo?.startsWith(codInicio)) {
            //    throw new Error("paquete2 no coincide con las primeras 4 letras del codxd");
            //  }
             
             // 4. Validar paquete3 (debe cumplirse una de las dos condiciones)
             const matchCompleto = codResto.includes(Paquete2SinPrefijo);
            //  const matchParcial = codResto.includes(paquete3Inicio);
             
             if (Paquete1SinPrefijo != paquete2 && Paquete2SinPrefijo != paquete3 ) {
            //  if (!matchCompleto && !matchParcial) {
              console.log("Validación exitosa");

              throw new Error("paquete3 no coincide con codxd (ni completo ni por las primeras 4 letras)");
             }
             
             console.log("Validación exitosa");
             


    
    // try {
    //   if(paquete.paquete2 === verifyCod1.cod && paquete.paquete3 === verifyCod2.cod){
    //     // console.log("si coinciden")
    //     const updateOrden = await updateOrdenDat(tableName, orden, Estado, updateDataT);
    //     // console.log("Cantidad total",updateOrden)
    //     // orden de los factores no altera el producto
    //    }else{
    //     // throw new Error("La Orden no Coinside con el paquete");
    //     console.log("orden de los factores altera el producto")
    //    }
    
    // } catch (error) {
      
    // }
        
    // try {
    //   // Segunda verificación en caso de error
    //   if (paquete.paquete3 === verifyCod2.cod && paquete.paquete2 === verifyCod1.cod) {
    //     const updateOrden = await updateOrdenDat(tableName, orden, Estado, updateDataT);
    //   } else {
    //     throw new Error("La Orden sigue sin coincidir con el paquete en la segunda verificación");
    //   }
    // } catch (error) {
    //   // console.error("Error en la segunda validación:", error.message);
    //   // throw new Error("La Orden sigue sin coincidir con el paquete en la segunda verificación");
    // }

         const updateOrden = await updateOrdenDat(tableName, orden, Estado, updateDataT);
      } 




    } catch (error) {
      // console.error("Error en la segunda validación:", error.message);
      throw new Error("No se puede Laminar Chapas de proveedores DIferentes");
    }
    
   }
   
   
   
   else if(Estado === 1){
    const updateOrden = await updateOrdenDat(tableName, orden, Estado, updateDataO);
    // console.log("Cantidad total",updateOrden)


   }else if(Estado === 4){
    const Estado = 2;
    updateDataO.estado=2;
    const updateOrden = await updateOrdenDat(tableName, orden, Estado, updateDataO);
   
  
  
  }else if(Estado === 5){
    const updateOrden = await updateChapa(tableName, orden, serie, objetoPerdido);
   }
   

    // Generar la consulta de actualización
    //  const updateQuery = await generateUpdateQuery(tableName, id, updateData);
    const values = [...Object.values(updateData2), id];

    // Ejecutar la actualización
    // await entityManager.query(updateQuery, values);

    // Obtener todos los datos de la fila actualizada
    const selectQuery = `SELECT * FROM ${tableName} WHERE orden = ?`;
    const result = await entityManager.query(selectQuery, [orden]);
    const data = result[0];
    // console.log("resultado retornado", data);
    
    // Desestructuramos los valores
    let { caballetes1 = caballete1, caballetes2 = caballete2 } = data;
    
    // Si uno es null, tomamos el valor del otro
    if (!caballetes1 && caballetes2) {
    caballete1 = caballete2;
    } else if (!caballetes2 && caballetes1) {
    caballete2 = caballete1;
    }
    
    // Ahora podés seguir usando caballete1 y caballete2
    // console.log(“Caballete 1:”, caballete1);
    // console.log(“Caballete 2:”, caballete2);
    
    // Retornar el resultado completo si querés
    return {
    ...data,
    caballete1,
    caballete2
    };
     // Se asume que `id` es único y solo habrá una fila
  } catch (error) {
    console.error("Error en la actualización:", error);
    throw error; // Propaga el error al llamador
  }
};




// try {
//   // Segunda verificación en caso de error
//   if (llave === 1) {


//     console.log("llave 1", llave)
  
      
//     const paquete = await  getOnePaquet("productos", cod , llave );
//      console.log("paquete xd =================================>",paquete)

//     // Si caballete1 es null, undefined o un string vacío, usa caballete2
// caballete1 = caballete1?.trim() ? caballete1 : caballete2;

// // Si caballete2 es null, undefined o un string vacío, usa caballete1
// caballete2 = caballete2?.trim() ? caballete2 : caballete1;


//        const verifyCod1 = await getOnePaquete("stock", caballete1);
//         console.log("paquete master2 <=================================",verifyCod1.cod)

//        const verifyCod2 = await getOnePaquete("stock", caballete2);
//          console.log("paquete master <=================================",verifyCod2.cod)



// try {
//   if(paquete.paquete2 === verifyCod1.cod && paquete.paquete3 === verifyCod2.cod){
//     // console.log("si coinciden")
//     const updateOrden = await updateOrdenDat(tableName, orden, Estado, updateDataT);
//     // console.log("Cantidad total",updateOrden)
//     // orden de los factores no altera el producto
//    }else{
//     // throw new Error("La Orden no Coinside con el paquete");
//     console.log("orden de los factores altera el producto")
//    }

// } catch (error) {
  
// }
    
// try {
//   // Segunda verificación en caso de error
//   if (paquete.paquete3 === verifyCod2.cod && paquete.paquete2 === verifyCod1.cod) {
//     const updateOrden = await updateOrdenDat(tableName, orden, Estado, updateDataT);
//   } else {
//     throw new Error("La Orden sigue sin coincidir con el paquete en la segunda verificación");
//   }
// } catch (error) {
//   // console.error("Error en la segunda validación:", error.message);
//   // throw new Error("La Orden sigue sin coincidir con el paquete en la segunda verificación");
// }





//   } 
// } catch (error) {
//   // console.error("Error en la segunda validación:", error.message);
//   throw new Error("No se puede Laminar Chapas de proveedores DIferentes");
// }
