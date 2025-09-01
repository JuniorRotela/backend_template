import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import { format } from 'date-fns';
import { getData } from "../../services/autoClave/getDatos.services";
// export async function insertDataLog(tableName: string, data: Record<string, any>[]): Promise<any> {
//   // Filtrar solo los registros completos (con todos los campos necesarios)
//   const filteredData = data.filter(item => 
//     item.fecha && 
//     item.hora && 
//     item.temperatura && 
//     item.spTemperatura && 
//     item.presion && 
//     item.spPresion
//   );

//   // Limitar a los últimos 5 registros
//   const last10Records = filteredData.slice(-5);

//   // for (const record of last10Records) {
//   for (const record of filteredData) {
//     const { fecha, hora, temperatura, spTemperatura, presion, spPresion } = record;

//     // Crear el objeto con los datos actualizados y formateados
//     let datosActualizados: Record<string, any> = {
//       fecha,
//       hora,
//       temperatura,
//       spTemperatura,
//       presion,
//       spPresion,
//     };

//     // Generar la consulta de inserción
//     const insertQuery = generateInsertQuery(tableName, datosActualizados);

//     try {
//       // Obtener la conexión actual
//       const connection = getConnection();

//       // Ejecutar la consulta SQL y obtener el resultado de la inserción
//       const result = await connection.query(`${insertQuery} RETURNING *`);
//       const insertedData = result[0];

//       console.log("Data inserted successfully:", insertedData);
//     } catch (error: any) {
//       console.error("Error inserting data:", error);
//       throw error;
//     }
//   }
// }


export async function insertDataLog(tableName: string, data: Record<string, any>[]): Promise<any> {
  // Filtrar solo los registros completos (con todos los campos necesarios)
  const filteredData = data.filter(item =>
    item.fecha &&
    item.hora &&
    item.temperatura &&
    item.spTemperatura &&
    item.presion &&
    item.spPresion
  );

  // Ordenar los datos por fecha y hora para asegurar el orden cronológico
  filteredData.sort((a, b) => {
    const dateA = new Date(`${a.fecha} ${a.hora}`).getTime();
    const dateB = new Date(`${b.fecha} ${b.hora}`).getTime();
    return dateA - dateB;
  });

  let lastInsertedTime: Date | null = null;

  for (const record of filteredData) {
    const { fecha, hora, temperatura, spTemperatura, presion, spPresion } = record;
    
    // Convertir fecha y hora en un objeto Date
    const currentRecordTime = new Date(`${fecha} ${hora}`);

    // Verificar si es el primer registro o si ha pasado al menos 1 minuto
    if (!lastInsertedTime || (currentRecordTime.getTime() - lastInsertedTime.getTime()) >= 30000) {
      // Actualizar el último tiempo insertado
      lastInsertedTime = currentRecordTime;
    
      const response = await getData("autoclave");
      // Crear el objeto con los datos actualizados y formateados
      let datosActualizados: Record<string, any> = {
        fecha,
        hora,
        temperatura,
        spTemperatura,
        presion,
        spPresion,
        id_entradaautoclave: response[0].id,
      };

      // Generar la consulta de inserción
      const insertQuery = generateInsertQuery(tableName, datosActualizados);

      try {
        // Obtener la conexión actual
        const connection = getConnection();

        // Ejecutar la consulta SQL y obtener el resultado de la inserción
        const result = await connection.query(`${insertQuery} RETURNING *`);
        const insertedData = result[0];

        // console.log("Data inserted successfully:", insertedData);
      } catch (error: any) {
        console.error("Error inserting data:", error);
        throw error;
      }
    }
  }
}
