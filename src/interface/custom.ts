// import { Request } from "express";

// // Define tu CustomFile con las propiedades necesarias
// interface CustomFile {
//   fieldname: string; // Nombre del campo
//   originalname: string; // Nombre original del archivo
//   encoding: string; // Codificación del archivo
//   mimetype: string; // Tipo MIME
//   buffer: Buffer; // Buffer del archivo
//   size: number; // Tamaño del archivo
//   mv: (path: string, callback: (err: any) => void) => void; // Método mv personalizado
// }

// // Extiende el tipo Request de Express para incluir la propiedad 'files'
// interface CustomRequest extends Request {
//   files?: {
//     [fieldname: string]: CustomFile[]; // Cambia a un arreglo de CustomFile
//   } | undefined; // Agrega undefined si no se envían archivos
// }

// // Exporta el tipo CustomRequest
// export default CustomRequest;