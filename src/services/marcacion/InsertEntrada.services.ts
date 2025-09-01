import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import { format, parseISO, differenceInMinutes, isDate, parse, isAfter, isBefore, setHours, setMinutes, setSeconds } from 'date-fns';
import getOneMarcacion from "./getOne.services";
import { updateData } from "../salarios/update.services";
import getUserId from "./getUser.services";
import getHorarios from "./getOneHorario.services";
import { getDataAccess } from "./DarAcceso";

export async function insertDataEntrada(tableName: string, data: Record<string, any>): Promise<any> {
  const { employeeNoString, dateTime } = data;
  console.log("🚀 ~ insertDataEntrada ~ data:", data)

  let parsedDate: Date;
  if (typeof dateTime === 'string') {
    parsedDate = parseISO(dateTime);
  } else if (isDate(dateTime)) {
    parsedDate = dateTime;
  } else {
    throw new Error('Invalid date format');
  }
  console.log("🚀 ~ insertDataEntrada ~ parsedDate:", parsedDate)


  const formattedDate = format(parsedDate, "yyyy-MM-dd HH:mm:ss.SSS");
  console.log("🚀 ~ insertDataEntrada ~ formattedDate:", formattedDate)

  // Verificar la última marcación del día para este empleado
  const verifyMarcacion = await getOneMarcacion(tableName, employeeNoString);
  
// caclulo para descuento por llegada tardia
//    const calculateDescuento = (minutes:any) => {
//     const valorPorHora = 11660;
//     const totalDescuento = (minutes / 60) * valorPorHora;
//     return totalDescuento;
// };

const calculateDescuento = (minutes: any) => {
  const valorPorHora = 11660;
  const totalDescuento = (minutes / 60) * valorPorHora;
  return Math.round(totalDescuento); // Redondea el resultado al entero más cercano
};

// const calculateAdicional = (horas:any) => {
//   const valorPorHora = 3498;
//   const valor = (horas * valorPorHora);

//   return valor;
// }

// Función para calcular el adicional nocturno
const calculateAdicional = (minutes: any) => {
  const valorPorMinuto = 3498 / 60; // Dividir la tarifa por 60 para obtener el valor por minuto
  const totalAdicional = minutes * valorPorMinuto;
  return Math.round(totalAdicional); // Redondea el resultado al entero más cercano
};



 // Si existe una última marcación, verificar si fue hace menos de 5 minutos
 if (verifyMarcacion) {
  const ultimaMarcacionFecha = new Date(
    verifyMarcacion.salida || 
    verifyMarcacion.entrada_almuerzo || 
    verifyMarcacion.salida_almuerzo || 
    verifyMarcacion.entrada
  );

  const diferenciaMinutos = differenceInMinutes(parsedDate, ultimaMarcacionFecha);

  // Si la última marcación fue hace menos de 5 minutos, no registrar una nueva
  if (diferenciaMinutos < 20) {
    const Access = await getDataAccess()
    console.log("La última marcación fue hace menos de 20 minutos. No se insertará una nueva marcación.");
    return;
  }
}

  let datosActualizados: Record<string, any> = {
    id_empleado: parseInt(employeeNoString),
  };

  const verifyUser = await getUserId("user", employeeNoString);
  //  console.log("--------------datos del usuario:", verifyUser)
  const verifyGrupo = await verifyUser.id_grupo;
  // console.log("================== grupo",verifyGrupo)
  const verifyHorarios = await getHorarios("horarios", verifyUser.id_horarios);
//  console.log("🚀 ~ verifyHorarios:", verifyHorarios)

  // Comparar la hora de entrada
  if (!verifyMarcacion || (!verifyMarcacion.entrada && !verifyMarcacion.salida && !verifyMarcacion.entrada_almuerzo && !verifyMarcacion.salida_almuerzo)) {
    datosActualizados.entrada = formattedDate;

    // Convertir la hora de entrada del horario y la marcación a horas y minutos
    const horaEntradaHorario = parse(verifyHorarios.hora_entrada, 'HH:mm', new Date());
    const diferenciaMinutos = differenceInMinutes(parsedDate, horaEntradaHorario);
    // console.log("🚀 ~ insertDataEntrada ~ diferenciaMinutos:", diferenciaMinutos)

    // Si la diferencia es mayor a 5 minutos, asignar el descuento
    if (diferenciaMinutos > 5) {
      datosActualizados.id_descuento = 1;
      datosActualizados.descuento =  calculateDescuento(diferenciaMinutos);
    }
  } else if (verifyMarcacion.entrada != null && !verifyMarcacion.salida_almuerzo) {
    datosActualizados.salida_almuerzo = formattedDate;

    
    const entrada = typeof verifyMarcacion.entrada === 'string' ? parseISO(verifyMarcacion.entrada) : verifyMarcacion.entrada;
    const salida = parsedDate;
    // let totalHoras = differenceInMinutes(salida, entrada);

    if(verifyGrupo === 3 || verifyGrupo === 8){
      // Cálculo del adicional nocturno
     // Cálculo del adicional nocturno
     const inicioAdicional = setSeconds(setMinutes(setHours(new Date(), 3), 0), 0);
     const finAdicional = setSeconds(setMinutes(setHours(new Date(), 6), 0), 0);
     
     if (
       (isAfter(entrada, inicioAdicional) || isBefore(entrada, finAdicional)) &&
       (isAfter(salida, inicioAdicional) || isBefore(salida, finAdicional))
     ) {
       const inicioTrabajo = isBefore(entrada, inicioAdicional) ? inicioAdicional : entrada;
       const finTrabajo = isAfter(salida, finAdicional) ? finAdicional : salida;
       const minutosAdicionales = differenceInMinutes(finTrabajo, inicioTrabajo);
       datosActualizados.adicional_nocturno = Math.max(calculateAdicional(minutosAdicionales), 0);
     } else {
       datosActualizados.adicional_nocturno = 0; // No hay adicional nocturno si no se trabaja en el rango
     }
     }
     


  } else if (verifyMarcacion.salida_almuerzo != null && !verifyMarcacion.entrada_almuerzo) {
    datosActualizados.entrada_almuerzo = formattedDate;
    
    if(verifyGrupo === 3){
      // Cálculo del adicional nocturno
     // Cálculo del adicional nocturno
     const inicioAdicional = setSeconds(setMinutes(setHours(new Date(), 3), 0), 0);
     const finAdicional = setSeconds(setMinutes(setHours(new Date(), 6), 0), 0);
     
     const entrada = typeof verifyMarcacion.entrada === 'string' ? parseISO(verifyMarcacion.entrada) : verifyMarcacion.entrada;
     const salida = parsedDate;
     // let totalHoras = differenceInMinutes(salida, entrada);
 
     if (
       (isAfter(entrada, inicioAdicional) || isBefore(entrada, finAdicional)) &&
       (isAfter(salida, inicioAdicional) || isBefore(salida, finAdicional))
     ) {
       const inicioTrabajo = isBefore(entrada, inicioAdicional) ? inicioAdicional : entrada;
       const finTrabajo = isAfter(salida, finAdicional) ? finAdicional : salida;
       const minutosAdicionales = differenceInMinutes(finTrabajo, inicioTrabajo);
       datosActualizados.adicional_nocturno = Math.max(calculateAdicional(minutosAdicionales), 0);
     } else {
       datosActualizados.adicional_nocturno = 0; // No hay adicional nocturno si no se trabaja en el rango
     }
     }
  } else if (verifyMarcacion.entrada_almuerzo != null && !verifyMarcacion.salida) {
    datosActualizados.salida = formattedDate;

    const entrada = typeof verifyMarcacion.entrada === 'string' ? parseISO(verifyMarcacion.entrada) : verifyMarcacion.entrada;
    const salida = parsedDate;
    let totalHoras = differenceInMinutes(salida, entrada);

    if (verifyMarcacion.salida_almuerzo && verifyMarcacion.entrada_almuerzo) {
      const salidaAlmuerzo = typeof verifyMarcacion.salida_almuerzo === 'string' ? parseISO(verifyMarcacion.salida_almuerzo) : verifyMarcacion.salida_almuerzo;
      const entradaAlmuerzo = typeof verifyMarcacion.entrada_almuerzo === 'string' ? parseISO(verifyMarcacion.entrada_almuerzo) : verifyMarcacion.entrada_almuerzo;
      const almuerzoDuracion = differenceInMinutes(entradaAlmuerzo, salidaAlmuerzo);
      totalHoras -= almuerzoDuracion;
    }

    
    // Almacenar directamente el total de horas trabajadas en minutos
    datosActualizados.horas = totalHoras; // Total en minutos


    // // Agregar cálculo de adicional nocturno si la marcación es entre las 3 y las 6
    // console.log("entro aca")
    // const entradaxd = verifyMarcacion.entrada;
    // console.log("🚀 ~  Entradaxd:", entradaxd)
    
    // const salidaxd = verifyMarcacion.salida_almuerzo;
    // console.log("🚀 ~  Salidaxd:", salidaxd)

if(verifyGrupo === 3){
 // Cálculo del adicional nocturno
// Cálculo del adicional nocturno
const inicioAdicional = setSeconds(setMinutes(setHours(new Date(), 3), 0), 0);
const finAdicional = setSeconds(setMinutes(setHours(new Date(), 6), 0), 0);

if (
  (isAfter(entrada, inicioAdicional) || isBefore(entrada, finAdicional)) &&
  (isAfter(salida, inicioAdicional) || isBefore(salida, finAdicional))
) {
  const inicioTrabajo = isBefore(entrada, inicioAdicional) ? inicioAdicional : entrada;
  const finTrabajo = isAfter(salida, finAdicional) ? finAdicional : salida;
  const minutosAdicionales = differenceInMinutes(finTrabajo, inicioTrabajo);
  datosActualizados.adicional_nocturno = Math.max(calculateAdicional(minutosAdicionales), 0);
} else {
  datosActualizados.adicional_nocturno = 0; // No hay adicional nocturno si no se trabaja en el rango
}
}

  }

  if (verifyMarcacion && verifyMarcacion.id) {
    const id = verifyMarcacion.id;
    try {
      await updateData(tableName, id, datosActualizados);
      const Access = await getDataAccess()
      console.log("Data updated successfully:", datosActualizados);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  } else {
    const insertQuery = generateInsertQuery(tableName, datosActualizados);
    try {
      const connection = getConnection();
      const result = await connection.query(`${insertQuery} RETURNING *`);
      const insertedData = result[0];
      console.log("Data inserted successfully:", insertedData);
      const Access = await getDataAccess()
      return insertedData;
    } catch (error) {
      console.error("Error inserting data:", error);
      throw error;
    }
  }
}