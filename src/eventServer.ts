import express, { Request, Response } from 'express';
import multer from 'multer';
import axios from 'axios';

const eventApp = express();
const port = 5002;

// Configura multer
const upload = multer();

// Variable para almacenar eventos en un buffer
const eventBuffer: any[] = [];

// Retraso en milisegundos
const delay = 3000; // 3 segundos

// URL del controlador de creación de marcaciones
const createMarcacionUrl = 'http://192.168.88.69:5003/marcacion'; 
// const createMarcacionUrl = 'http://localhost:5003/marcacion'; 


// Función para procesar eventos con retraso
const processEventsWithDelay = async () => {
    if (eventBuffer.length === 0) return;

    setTimeout(async () => {
        const event = eventBuffer.shift();
        const accessEvent = event?.AccessControllerEvent;

        // Filtra los eventos que contienen 'employeeNoString'
        if (accessEvent && accessEvent.employeeNoString) {
            // console.log("El Funcionario Marcó:", event);
            let data = event;
            const {dateTime} = data;
            const { employeeNoString} = accessEvent;

            const datosUpdate = { employeeNoString, dateTime };
            console.log("datos a pasar", datosUpdate);

            try {
                // Envía los datos al controlador
                const response = await axios.post(createMarcacionUrl, datosUpdate);
                console.log('Respuesta del controlador:', response.data);
            } catch (error) {
                console.error('Error al enviar datos al controlador:', error);
            }
        } else {
            // console.log('Evento ignorado (sin employeeNoString):', event);
        }

        // Llama a la función de procesamiento nuevamente si hay más eventos
        processEventsWithDelay();
    }, delay);
};

// Ruta para manejar los eventos recibidos
eventApp.post('/evento', upload.any(), (req, res) => {
    const eventLog = req.body.event_log;
    if (!eventLog) {
        return res.status(400).send('No se recibió ningún dato');
    }

    // Parsea el evento JSON
    try {
        const parsedEvent = JSON.parse(eventLog);
        // Añade el evento al buffer
        eventBuffer.push(parsedEvent);

        // Inicia el procesamiento si no está en curso
        if (eventBuffer.length === 1) {
            processEventsWithDelay();
        }

        res.status(200).send('Evento recibido y será procesado con retraso');
    } catch (error) {
        console.error('Error al parsear el evento:', error);
        res.status(400).send('Error al parsear el evento');
    }
});

// Escuchar en todas las interfaces disponibles
eventApp.listen(port, '0.0.0.0', () => {
    console.log(`Servidor de eventos escuchando en http://0.0.0.0:${port}`);
});


