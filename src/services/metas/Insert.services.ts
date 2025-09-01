import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import { updateData } from "../grupos/update.services";


export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
  const { id_grupo, id_plus} = data;

  // Crear el objeto con los datos actualizados y formateados
  let datosActualizados: Record<string, any> = {
    id_grupo: id_grupo,
    // descripcion: descripcion,
     id_plus: id_plus,
    ...data
  };

  // Generar la consulta de inserción
  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {
    // Obtener la conexión actual
    const connection = getConnection();

    // Ejecutar la consulta SQL y obtener el resultado de la inserción
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    console.log("Data inserted successfully:", insertedData);
   
    if(id_plus === 1){
      const datos = {
        status_plus: 1
      }
       await updateData("grupos", id_grupo, datos);
    }
    

    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}