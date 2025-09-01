// import { getManager } from 'typeorm';

// const getDataProduccionListView = async (fecha: string): Promise<any | null> => {
//  console.log("============>",fecha)
//   try {
//     const entityManager = getManager();
//     // Llamada al procedimiento almacenado
//     const result = await entityManager.query(`CALL sp_reporte_view(?)`, [fecha]);
    
//     // Verifica si hay resultados
//     if (result.length > 0) {
//       return result[0]; // Devolver los resultados del primer conjunto de resultados
//     } else {
//       return null; // Si no hay resultados
//     }
//   } catch (error) {
//     console.error("Error getting data:", error);
//     throw error;
//   }
// };

// export default getDataProduccionListView;

import { getManager } from 'typeorm';

const getDataProduccionListViewDia = async (fecha:string): Promise<any | null> => {
   console.log("===> fecha enviada:", fecha);
  try {
    const entityManager = getManager();

    // Llamada al procedimiento con dos parámetros
    const result = await entityManager.query(
      `CALL sp_reporte_view_date(?)`,
      [fecha]
    );

    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

export default getDataProduccionListViewDia;
