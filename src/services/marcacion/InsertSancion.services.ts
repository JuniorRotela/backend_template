import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import getOneMarcacion from "./getOne.services";

export async function insertSancion(tableName: string, data: Record<string, any>): Promise<any> {
  const { id_empleado, id_descuento} = data;

  
  let datosActualizados: Record<string, any> = {
    id_empleado: id_empleado,
    id_descuento: id_descuento,
    status_active: 2

  };


    const insertQuery = generateInsertQuery(tableName, datosActualizados);
    try {
      const connection = getConnection();
      const result = await connection.query(`${insertQuery} RETURNING *`);
      const insertedData = result[0];
      console.log("Data inserted successfully:", insertedData);
      return insertedData;
    } catch (error) {
      console.error("Error inserting data:", error);
      throw error;
    }
  }
