import { getManager } from 'typeorm';

const getDataInterfoliacionView = async (fechas: { fechaInicio: string; fechaFin: string }): Promise<any | null> => {

  try {
    const entityManager = getManager();
    // Llamada al procedimiento almacenado
    const result = await entityManager.query(`CALL getInterfoliacionByDate(?, ?)`, [fechas.fechaInicio, fechas.fechaFin]);
    
    // console.log("🚀 ~ getDataInterfoliacionView ~ result:", result)
    // Verifica si hay resultados
    if (result.length > 0) {
      return result[0]; // Devolver los resultados del primer conjunto de resultados
    } else {
      return null; // Si no hay resultados
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

export default getDataInterfoliacionView;