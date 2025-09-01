import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import { format } from 'date-fns';

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
  const { id_empleado, id_usuario, id_grupo, id_salario, horas, entrada, salida } = data;

  // Convertir entrada y salida de timestamp a formato legible
  let formattedEntrada = format(new Date(entrada * 1000), 'yyyy-MM-dd HH:mm:ss'); // Multiplicar por 1000 para convertir de segundos a milisegundos
  let formattedSalida = format(new Date(salida * 1000), 'yyyy-MM-dd HH:mm:ss');

  // Crear el objeto con los datos actualizados y formateados
  let datosActualizados: Record<string, any> = {
    id_empleado: id_empleado,
    id_grupo: id_grupo,
    id_usuario: id_usuario,
    id_salario: id_salario,
    horas: horas,
    entrada: formattedEntrada, // Usar la fecha formateada
    salida: formattedSalida // Usar la fecha formateada
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
    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}