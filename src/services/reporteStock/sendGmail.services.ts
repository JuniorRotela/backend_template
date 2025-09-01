// import { getConnection } from "typeorm";
// import { generateInsertQuery } from "../../genericQueries/insertBuilder";
// import nodemailer from "nodemailer";

// export async function insertData(tableName: string, data: Record<string, any>): Promise<any> {
//   const {
//     cod_paquete,
//     obs,
//     cantidad,
//     imagen,
//     imagen2,
//     imagen3,
//     serie,
//     cantidad_problema,
//     id_problema,
//     id_usuario,
//     id_producto,
//   } = data;

//   let datosActualizados: Record<string, any> = {
//     cod_paquete: cod_paquete,
//     cantidad: cantidad,
//     serie: serie,
//     cantidad_problema: cantidad_problema,
//     obs: obs,
//     imagen: imagen,
//     imagen2: imagen2,
//     imagen3: imagen3,
//     id_problema: id_problema,
//     id_usuario: id_usuario,
//     id_producto: id_producto,
//   };

//   const insertQuery = generateInsertQuery(tableName, datosActualizados);

//   try {
//     // Obtener la conexión actual
//     const connection = getConnection();

//     // Ejecutar la consulta SQL y obtener el resultado de la inserción
//     const result = await connection.query(`${insertQuery} RETURNING *`);
//     const insertedData = result[0];

//     console.log("Data inserted successfully:", insertedData);

//     // Configuración del transportador SMTP para Gmail
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "tu-email@gmail.com", // Reemplaza con tu dirección de Gmail
//         pass: "tu-contraseña", // Contraseña o App Password
//       },
//     });

//     // Configuración del correo
//     const mailOptions = {
//       from: '"Sistema de Reportes" <tu-email@gmail.com>',
//       to: "destinatario@gmail.com", // Dirección de correo del destinatario
//       subject: "Nuevo Registro Insertado",
//       text: `Se ha registrado un nuevo dato en la tabla ${tableName}.\n\nDatos registrados:\n${JSON.stringify(
//         insertedData,
//         null,
//         2
//       )}`,
//       html: `
//         <h1>Nuevo Registro Insertado</h1>
//         <p>Se ha registrado un nuevo dato en la tabla <strong>${tableName}</strong>.</p>
//         <pre>${JSON.stringify(insertedData, null, 2)}</pre>
//       `,
//       attachments: [
//         ...(imagen ? [{ filename: "imagen1.png", content: imagen, encoding: "base64" }] : []),
//         ...(imagen2 ? [{ filename: "imagen2.png", content: imagen2, encoding: "base64" }] : []),
//         ...(imagen3 ? [{ filename: "imagen3.png", content: imagen3, encoding: "base64" }] : []),
//       ],
//     };

//     // Enviar el correo
//     await transporter.sendMail(mailOptions);
//     console.log("Correo enviado exitosamente.");

//     return insertedData;

//   } catch (error) {
//     console.error("Error inserting data or sending email:", error);
//     throw error;
//   }
// }



import { getConnection } from "typeorm";
import { generateInsertQuery } from "../../genericQueries/insertBuilder";
import nodemailer from "nodemailer";

export async function insertDataAndSendEmail(
  tableName: string,
  data: Record<string, any>
): Promise<any> {
  const { cod_paquete, obs, cantidad, imagen, imagen2, imagen3, serie, cantidad_problema, id_problema, id_usuario, id_producto } = data;

  let datosActualizados: Record<string, any> = {
    cod_paquete: cod_paquete,
    cantidad: cantidad,
    serie: serie,
    cantidad_problema: cantidad_problema,
    obs: obs,
    imagen: imagen,
    imagen2: imagen2,
    imagen3: imagen3,
    id_problema: id_problema,
    id_usuario: id_usuario,
    id_producto: id_producto,
  };

  const insertQuery = generateInsertQuery(tableName, datosActualizados);

  try {
    // Obtener la conexión actual
    const connection = getConnection();

    // Ejecutar la consulta SQL y obtener el resultado de la inserción
    const result = await connection.query(`${insertQuery} RETURNING *`);
    const insertedData = result[0];

    console.log("Data inserted successfully:", insertedData);

    // Enviar correo
    await sendEmail(insertedData);

    return insertedData;

  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}

async function sendEmail(data: Record<string, any>): Promise<void> {
  try {
    // Configuración del transportador de Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "grupodracenati@gmail.com", // Tu dirección de Gmail
        pass: "z i u n w o f b m o d c i e d j" // Contraseña de tu cuenta o App Password
      },
    });

    // Construir el contenido del correo
    const mailOptions = {
      from: '"Sistema de Reportes" <grupodracenati@gmail.com>',
      to: "diegofriedenlibparedes@gmail.com", // Correo del destinatario
      subject: "Nuevo dato insertado en la base de datos",
      html: `
        <h1>Nuevo Reporte</h1>
        <p><strong>Reclamo numero:</strong> ${data.id}</p>
        <p><strong>ID Problema:</strong> ${data.id_problema}</p>
        <p><strong>Código de Paquete:</strong> ${data.cod_paquete}</p>
        <p><strong>Cantidad:</strong> ${data.cantidad}</p>
        <p><strong>Cantidad con Problemas:</strong> ${data.cantidad_problema}</p>
        <p><strong>Serie:</strong> ${data.serie}</p>
        <p><strong>Observaciones:</strong> ${data.obs}</p>
      `,
      attachments: [
        ...(data.imagen
          ? [{ filename: "imagen1.png", content: data.imagen, encoding: "base64" }]
          : []),
        ...(data.imagen2
          ? [{ filename: "imagen2.png", content: data.imagen2, encoding: "base64" }]
          : []),
        ...(data.imagen3
          ? [{ filename: "imagen3.png", content: data.imagen3, encoding: "base64" }]
          : []),
      ],
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: %s", info.messageId);

  } catch (error) {
    console.error("Error enviando el correo:", error);
    throw error;
  }
}
