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

const getDataProduccionListView = async (fechas: { fechaInicio: string; fechaFin: string }): Promise<any | null> => {
  // console.log("===> fechas:", fechas);
  try {
    const entityManager = getManager();

    // Llamada al procedimiento con dos parámetros
    const result = await entityManager.query(
      `CALL sp_reporte_view(?, ?)`,
      [fechas.fechaInicio, fechas.fechaFin]
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

export default getDataProduccionListView;
