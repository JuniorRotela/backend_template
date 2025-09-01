import { getManager } from 'typeorm';
import fetch from 'node-fetch'; // Asegurate de tener esta línea

export const getDataAccess = async (): Promise<any[]> => {
  try {
    const entityManager = getManager();

    // Hacemos el GET a la ruta del ESP32
    const response = await fetch('http://192.168.88.11/on');
    
    if (!response.ok) {
      throw new Error(`Error al hacer la petición al ESP32: ${response.status}`);
      
    }

    const data = await response.text(); // o .json() si esperás JSON
    console.log('📡 Respuesta del ESP32:', data);

    // Por ahora solo devolvemos un arreglo vacío
    return [];
  } catch (error) {
    console.error('❌ Error en getDataAccess:', error);
    throw error;
  }
};
