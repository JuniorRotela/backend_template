
import fs from 'fs/promises';
import path from 'path';
import { insertDataLog} from "../autoClave/InsertLog.services";
// import { io } from '../../app';


// const networkPath = '\\\\DESKTOP-92U0D1K\\Historico';
const networkPath = '\\\\192.168.88.58\\Historico';


// Función para limpiar y convertir RTF a texto plano
function convertToPlain(rtf: string): string {
  return rtf
    .replace(/\{\\object[\s\S]*?\}/g, '') // Eliminar objetos
    .replace(/\\[a-z]+\d* ?/gi, '') // Eliminar etiquetas RTF
    .replace(/[\{\}]/g, '') // Eliminar llaves
    .replace(/\\par/g, '\n') // Reemplazar \par por saltos de línea
    .trim();
}

const pattern = /(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g;

// async function fetchLastFileData() {
//   try {
//     await fs.access(networkPath).catch(() => {
//       console.error('❌ ERROR: La ruta de red no es accesible.');
//       throw new Error('Ruta de red no accesible');
//     });

//     const files = await fs.readdir(networkPath);
//     if (files.length === 0) {
//       console.warn('⚠️ No hay archivos en la carpeta.');
//       return null;
//     }

//     const filesWithTime = await Promise.all(
//       files.map(async (file) => ({
//         file,
//         time: (await fs.stat(path.join(networkPath, file))).mtime.getTime(),
//       }))
//     );
//     const sortedFiles = filesWithTime.sort((a, b) => b.time - a.time);
//     const lastFile = sortedFiles[0]?.file;

//     if (!lastFile) {
//       console.warn('⚠️ No se encontró un archivo reciente.');
//       return null;
//     }

//     const lastFilePath = path.join(networkPath, lastFile);
//     console.log(`📄 Último archivo encontrado: ${lastFilePath}`);

//     let data = await fs.readFile(lastFilePath, 'utf8');
//     data = convertToPlain(data);

//     const matches = Array.from(data.matchAll(pattern));
//     if (matches.length === 0) {
//       console.warn('⚠️ No se encontraron datos válidos.');
//       return null;
//     }

//     const jsonData = matches.map((match) => ({
//       fecha: match[1],
//       hora: match[2],
//       temperatura: match[3],
//       spTemperatura: match[4],
//       presion: match[5],
//       spPresion: match[6],
//     }));

//     return { lastFilePath, jsonData };
//   } catch (error: any) {
//     console.error(`❌ Error al procesar el archivo: ${error.message}`);
//     return null;
//   }
// }


let isMonitoring = false;

export const monitorFileData = async (): Promise<{ [key: string]: string }[] | null> => {
  if (isMonitoring) return null; // Evita que se ejecute múltiples veces
  isMonitoring = true;

  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      console.log("⏳ Monitoreando archivo...");

      try {
        // Verificar si la carpeta existe
        await fs.access(networkPath).catch(() => {
          console.error('❌ ERROR: La ruta de red no existe o no es accesible.');
          clearInterval(interval);
          isMonitoring = false;
          resolve(null);
        });

        // Leer archivos de la carpeta
        const files = await fs.readdir(networkPath);
        if (files.length === 0) {
          console.warn('⚠️ No hay archivos en la carpeta de red.');
          clearInterval(interval);
          isMonitoring = false;
          resolve(null);
        }

        // Obtener el último archivo modificado
        const filesWithTime = await Promise.all(
          files.map(async (file) => ({
            file,
            time: (await fs.stat(path.join(networkPath, file))).mtime.getTime(),
          }))
        );
        const sortedFiles = filesWithTime.sort((a, b) => b.time - a.time);
        const lastFile = sortedFiles[0]?.file;
        if (!lastFile) {
          console.warn('⚠️ No se encontró un archivo reciente.');
          clearInterval(interval);
          isMonitoring = false;
          resolve(null);
        }
        const lastFilePath = path.join(networkPath, lastFile);
        console.log(`📄 Último archivo encontrado: ${lastFilePath}`);

        // Leer contenido del archivo
        let data = await fs.readFile(lastFilePath, 'utf8');
        data = convertToPlain(data);

        // Extraer datos
        const pattern = /(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g;
        const matches = Array.from(data.matchAll(pattern));

        if (matches.length === 0) {
          console.warn('⚠️ No se encontraron datos válidos en el archivo.');
          clearInterval(interval);
          isMonitoring = false;
          resolve(null);
        }

        const jsonData = matches.map((match) => ({
          fecha: match[1],
          hora: match[2],
          temperatura: match[3],
          spTemperatura: match[4],
          presion: match[5],
          spPresion: match[6],
        }));

        const lastEntry = jsonData[jsonData.length - 1];

        if (lastEntry.spPresion === '000.00') {
          console.log('⚠️ spPresion es 000.00, verificando si la presión cambia...');

          const initialPresion = lastEntry.presion;
          await new Promise(resolve => setTimeout(resolve, 60000)); // Esperar 1 minuto

          // Leer nuevamente el archivo
          const newData = await fs.readFile(lastFilePath, 'utf8');
          const newMatches = Array.from(convertToPlain(newData).matchAll(pattern));
          const newJsonData = newMatches.map((match) => ({
            fecha: match[1],
            hora: match[2],
            temperatura: match[3],
            spTemperatura: match[4],
            presion: match[5],
            spPresion: match[6],
          }));

          const newLastEntry = newJsonData[newJsonData.length - 1];

          if (newLastEntry.spPresion === '000.00' && newLastEntry.presion === initialPresion) {
            console.log('❌ La presión no ha cambiado, deteniendo monitoreo.');
          //   io.emit("newDataNotification", {
          //     message: `🚨🚀 AutoClave a terminado el Proceso ${new Date().toLocaleTimeString()}`,
          // });
            clearInterval(interval);
            isMonitoring = false;
            resolve(null);
          } else {
            console.log('✅ La presión cambió, continuando monitoreo.');
          }
        }

      // Obtener últimos 5 registros
      const lastFiveEntries = jsonData.slice(-5);

      // Insertar en la base de datos
      await insertDataLog("log_autoclave", lastFiveEntries);

      // Devolver el resultado
      resolve(lastFiveEntries);
      } catch (error: any) {
        console.error(`❌ Error al procesar el archivo: ${error.message}`);
        clearInterval(interval);
        isMonitoring = false;
        resolve(null);
      }
    }, 60000); // Ejecutar cada 1 minuto
  });
};
