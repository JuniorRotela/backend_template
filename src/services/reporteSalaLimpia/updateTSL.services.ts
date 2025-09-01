import { updateProblema } from "./update.services";
import ReporteSalaLimpia from "../../interface/reporteSalaLimpia";
import { getManager } from 'typeorm';
import { generateUpdateQuery } from '../../genericQueries/updateBuilder';

// Función reutilizable para actualizar un registro en la base de datos
export const UpdateReporteTSL = async (id: number, data: ReporteSalaLimpia) => {

  const tableName = "reportesalalimpia";
  try {
    // console.log("🚀 ~ UpdateReporteSL ~ data:", data)
    const resp = await updateProblema(tableName, id, data);
    // console.log("Respuesta de la actualización", resp);
    return resp;
  } catch (error) {
    console.error("Error updating reportelavadora in DB:", error);
    throw error;
  }
};