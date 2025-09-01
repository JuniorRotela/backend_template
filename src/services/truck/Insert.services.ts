import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import bcrypt from 'bcrypt';

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
  
  // Crea una copia de los datos con la entrada actualizada
  const datosActualizados = { ...data };


  console.log(data);
  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {    
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL y obtiene el resultado de la inserción
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    // console.log("Data inserted successfully:", insertedData);

    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}
