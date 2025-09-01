
import fs from 'fs/promises';
import path from 'path';

// Ruta de la carpeta compartida
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

// // Función para obtener datos del último archivo
// export const getLastFileData = async (): Promise<{ [key: string]: string }[] | null> => {
//   try {
//     // Verificar si la carpeta existe
//     await fs.access(networkPath).catch(() => {
//       console.error('❌ ERROR: La ruta de red no existe o no es accesible.');
//       throw new Error('Ruta de red no accesible');
//     });

//     // Leer archivos de la carpeta
//     const files = await fs.readdir(networkPath);
//     if (files.length === 0) {
//       console.warn('⚠️ No hay archivos en la carpeta de red.');
//       return null;
//     }

//     // Obtener información de los archivos y ordenarlos por fecha de modificación (más reciente primero)
//     const filesWithTime = await Promise.all(
//       files.map(async (file) => ({
//         file,
//         time: (await fs.stat(path.join(networkPath, file))).mtime.getTime(),
//       }))
//     );
//     const sortedFiles = filesWithTime.sort((a, b) => b.time - a.time);

//     // Obtener el archivo más reciente
//     const lastFile = sortedFiles[0]?.file;
//     if (!lastFile) {
//       console.warn('⚠️ No se encontró un archivo reciente.');
//       return null;
//     }
//     const lastFilePath = path.join(networkPath, lastFile);
//     console.log(`📄 Último archivo encontrado: ${lastFilePath}`);

//     // Leer contenido del archivo
//     let data = await fs.readFile(lastFilePath, 'utf8');
//     data = convertToPlain(data);

//     // Expresión regular para extraer datos (ajustar si es necesario)
//     const pattern = /(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g;
//     const matches = Array.from(data.matchAll(pattern));

//     if (matches.length === 0) {
//       console.warn('⚠️ No se encontraron datos válidos en el archivo.');
//       return null;
//     }

//     // Convertir los datos extraídos a JSON
//     const jsonData = matches.map((match) => ({
//       fecha: match[1],
//       hora: match[2],
//       temperatura: match[3],
//       spTemperatura: match[4],
//       presion: match[5],
//       spPresion: match[6],
//     }));

//     // Limitar los registros a los últimos 5
//     return jsonData.slice(-5);
//     // return jsonData;
//   } catch (error: any) {
//     console.error(`❌ Error al procesar el archivo: ${error.message}`);
//     return null;
//   }

// };

// -----------------------------------------------------obtener los dos archivo si se corta el documento al dia siguiente 

export const getLastFile = async (): Promise<{ [key: string]: string }[] | null> => {
  try {
    await fs.access(networkPath).catch(() => {
      console.error('❌ ERROR: La ruta de red no existe o no es accesible.');
      throw new Error('Ruta de red no accesible');
    });

    const files = await fs.readdir(networkPath);
    if (files.length < 2) {
      console.warn('⚠️ No hay suficientes archivos en la carpeta de red.');
      return null;
    }

    // Ordenar los archivos por fecha de modificación (más reciente primero)
    const filesWithTime = await Promise.all(
      files.map(async (file) => ({
        file,
        time: (await fs.stat(path.join(networkPath, file))).mtime.getTime(),
      }))
    );
    const sortedFiles = filesWithTime.sort((a, b) => b.time - a.time);

    // Obtener los dos archivos más recientes
    const lastFile = sortedFiles[0]?.file;
    const penultimateFile = sortedFiles[1]?.file;

    if (!lastFile) {
      console.warn('⚠️ No se encontró un archivo reciente.');
      return null;
    }

    // Función para extraer datos de un archivo
    const extractDataFromFile = async (filePath: string) => {
      let data = await fs.readFile(filePath, 'utf8');
      data = convertToPlain(data);

      const pattern = /(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g;
      const matches = Array.from(data.matchAll(pattern));

      return matches.map((match) => ({
        fecha: match[1],
        hora: match[2],
        temperatura: match[3],
        spTemperatura: match[4],
        presion: match[5],
        spPresion: match[6],
      }));
    };

    const lastFilePath = path.join(networkPath, lastFile);
    console.log(`📄 Último archivo encontrado: ${lastFilePath}`);

    let lastFileData = await extractDataFromFile(lastFilePath);

    // Si el primer registro del último archivo tiene la hora 00:00:00, obtener también el penúltimo archivo
    let penultimateFileData: { [key: string]: string }[] = [];
    if (lastFileData.length > 0 && lastFileData[0].hora === "00:00:00" && penultimateFile) {
      const penultimateFilePath = path.join(networkPath, penultimateFile);
      console.log(`📄 Penúltimo archivo encontrado: ${penultimateFilePath}`);
      penultimateFileData = await extractDataFromFile(penultimateFilePath);
    }

    // Retornar primero los registros del penúltimo archivo (si se cargaron) y luego los del último archivo
    return [...penultimateFileData, ...lastFileData];
  } catch (error: any) {
    console.error(`❌ Error al procesar los archivos: ${error.message}`);
    return null;
  }
};



