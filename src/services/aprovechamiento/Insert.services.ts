import { format } from 'date-fns';
import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import { updateData } from "../grupos/update.services";
import axios from 'axios'; // Asegúrate de tener axios instalado

export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
    const { serie, imagen } = data;




        // Enviar la imagen al microservicio de Python
        const sendImage = async () => {
            try {
              const response = await axios.post('http://127.0.0.1:5000/imagen', {
                image: imagen,
              }, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          
              // console.log('Respuesta del servidor:', response.data);
              return response.data.processed_image; 
             
            } catch (error) {
              console.error('Error al enviar la imagen:', error);
            }
          };
          
          // Llama a la función y espera la respuesta
    let processedImageBase64;
    try {
        processedImageBase64 = await sendImage();  // Espera la respuesta de sendImage
        // console.log("🚀 ~ insertData ~ processedImageBase64:", processedImageBase64)
        
    } catch (error) {
        console.error('Error al procesar la imagen:', error);
        return;  // Termina la función si hay un error
    }

          
          
    // Crear el objeto con los datos actualizados y formateados
    let datosActualizados: Record<string, any> = {
        serie: serie,
        imagen: processedImageBase64,  // Guardar la imagen en base64
        
    };



    // Generar la consulta de inserción
    const insertQuery =  generateInsertQuery(tableName, datosActualizados);
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