


// import express, { Request, Response } from 'express';
// import { insertDataSala } from "../src/services/salaLimpia/Insert.servicesS";
// import { io } from './app';

// const temperaturaEmitter = express();


// // Endpoint para recibir la temperatura y humedad
// temperaturaEmitter.get('/humedad', (req: Request, res: Response) => {
//     const temperaturax = req.query.temperatura;
//     let humedad = req.query.humedad;

//     // Verificación y corrección del valor de humedad
//     let humedadNum = parseFloat(humedad as string);
//     if (isNaN(humedadNum)) {
//         return res.status(400).send("Humedad inválida");
//     }

//     if (humedadNum < 9) {
//         humedadNum = 10.00;
//     }

//     const humedadFinal = `${humedadNum.toFixed(2)}%`;

//     insertDataSala("sala_limpia", { temp_interna: `${temperaturax}°C`, humedad_int: humedadFinal })
//         .then(() => {
//             io.emit("newDataNotification", {
//                 message: `Sala Limpia: Temperatura: ${temperaturax}°C y Humedad: ${humedadFinal}`,
//             });
//             res.status(200).send("Datos insertados correctamente");
//         })
//         .catch((error) => {
//             console.error('Error al insertar datos:', error);
//             res.status(500).send('Error al insertar datos');
//         });
// });


// export default temperaturaEmitter;
