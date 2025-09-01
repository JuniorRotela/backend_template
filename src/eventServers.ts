
import express from 'express';
import multer from 'multer';
import axios from 'axios';

const eventApp = express();
const port = 5004;

// Configura multer
const upload = multer();

// Variable para almacenar eventos en un buffer
const eventBuffer: any[] = [];

// Retraso en milisegundos
const delay = 3000; // 3 segundos

// URL del controlador de creación de marcaciones
const createMarcacionUrl = 'http://192.168.88.69:5003/marcacion';

// Middleware para procesar XML como texto
eventApp.use(express.text({ type: 'application/xml' }));

// Variable de control para evitar múltiples ejecuciones de processEventsWithDelay
let isProcessing = false;

// Función para procesar eventos con retraso
const processEventsWithDelay = async () => {
    if (isProcessing) return;
    isProcessing = true;

    while (eventBuffer.length > 0) {
        const event = eventBuffer.shift();
        const accessEvent = event?.AccessControllerEvent?.AccessControllerEvent;

        if (accessEvent) {
            if (!accessEvent.employeeNoString) {
                // console.log("⚠️ Evento sin 'employeeNoString', ignorado:", event);
                continue;
            }

            const { dateTime } = event.AccessControllerEvent;
            const { employeeNoString } = accessEvent;
            console.log(employeeNoString, dateTime);
            const datosUpdate = { employeeNoString, dateTime };

            console.log("📤 Enviando datos:", datosUpdate);
            try {
                const response = await axios.post(createMarcacionUrl, datosUpdate);
                console.log('✅ Respuesta del controlador:', response.data);
            } catch (error) {
                console.error('❌ Error al enviar datos al controlador:', error);
            }
        } else {
            console.log('⚠️ Evento sin estructura esperada:');
        }

        // Esperar antes de procesar el siguiente evento
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    isProcessing = false;
};

eventApp.post('/eventos', upload.any(), async (req, res) => {
    try {
        let eventData = req.body;

        if (typeof req.body === 'object' && req.body !== null) {
            if (req.body.AccessControllerEvent && typeof req.body.AccessControllerEvent === 'string') {
                eventData.AccessControllerEvent = JSON.parse(req.body.AccessControllerEvent);
            }
        }

        // console.log("✅ Evento Parseado Correctamente:", eventData);

        // Añadir al buffer para procesar
        eventBuffer.push(eventData);

        // Iniciar el procesamiento si no está en curso
        processEventsWithDelay();

        res.status(200).send('Evento recibido y procesado correctamente');
    } catch (error) {
        console.error('❌ Error al procesar el evento:', error);
        res.status(400).send('Error al procesar el evento');
    }
});

// Iniciar el servidor
eventApp.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Servidor de eventos escuchando en http://0.0.0.0:${port}`);
});
