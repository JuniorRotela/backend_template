import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import bcrypt from 'bcrypt';

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {

  const { id_caballete, caballete_origen, id_usuario, cod_empresa, id } =data;

  // Crea una copia de los datos con la entrada actualizada
  const datosActualizados = {
    caballete_origen,
    caballete_destino: id_caballete,
    id_usuario,
    cod_empresa,
    id_paquete: id
   };
  console.log("🚀 ~ insertData ~ datosActualizados:", datosActualizados)

  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {    
    // Obtiene la conexión actual
    const connection = getConnection();

    // Ejecuta la consulta SQL y obtiene el resultado de la inserción
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    console.log("Data inserted successfully:", insertedData);

    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}
