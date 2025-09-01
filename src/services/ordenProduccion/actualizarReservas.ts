
import { getManager } from 'typeorm';

const actualizarReservas = async (paquete: string, cantidad: number): Promise<void> => {
  try {
    const entityManager = getManager();
    // Llamada al procedimiento almacenado
    await entityManager.query(`CALL rrhh.ActualizarReservadosStockView(?, ?)`, [paquete, cantidad]);
    
    console.log("Reservas actualizadas correctamente.");
  } catch (error) {
    console.error("Error al actualizar las reservas:", error);
    throw error; // Relanzar el error para manejarlo en el controlador o middleware
  }
};

export default actualizarReservas;
