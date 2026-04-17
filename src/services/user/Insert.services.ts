import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import bcrypt from 'bcrypt';
import { AppDataSource } from "../../db";

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {

  const datosActualizados = { ...data };

  if (datosActualizados.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(datosActualizados.password, saltRounds);
    datosActualizados.password = hashedPassword;
  }

  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {

    const result = await AppDataSource.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}