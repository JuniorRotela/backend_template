// controllers/login.controllers.ts

import { Request, Response } from 'express';
import { verifyUser } from '../services/login/login.services';
import { generateToken } from '../middleware/auth'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import getOneHorarios from '../services/login/getOneHorarios.services';

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const result = await verifyUser('user', { username, password });

       console.log('Result from verifyUser:', result); // Agrega este log

    if (result.isValid) {
      // Verifica que result tenga id y username
      // const { id, username, id_level, id_horarios, cod_empresa} = result;
      const { id, username, id_level, id_horarios, cod_empresa, llave} = result;
     // Verificar que `id_horarios` no sea undefined
     if (id_horarios === undefined) {
      return res.status(400).json({ message: 'Horarios ID is missing' });
    }

   // Si id_horarios es un string, convertirlo a número; si ya es número, usarlo directamente
   const id_hora = typeof id_horarios === 'string' ? parseInt(id_horarios) : id_horarios;

   // Llamar a la función con el id convertido
  //  const verifyHorario = await getOneHorarios("horarios", id_hora);
    // const {descripcion} = verifyHorario; 
  //  console.log(verifyHorario);

      if (id && username) {
        // Generar el token JWT
        const token = generateToken({ id, username });

        return res.status(200).json({
          message: 'Login successful',
          token, // Incluir el token en la respuesta
          id_level,
          username,
          id,
          id_horarios,
          cod_empresa,
          llave,
          // descripcion
        });
      }
    }

    return res.status(401).json({ message: 'Usuario o Contraseña Incorrecta' });
  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



// import { Request, Response } from 'express';
// import { Server } from 'socket.io'; // Importa Server de socket.io
// import { verifyUser } from '../services/login/login.services';
// import { generateToken } from '../middleware/auth';
// import getOneHorarios from '../services/login/getOneHorarios.services';

// // Función que retorna el controlador con acceso a `io`
// export const loginController = (io: Server) => async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }

//   try {
//     const result = await verifyUser('user', { username, password });

//     if (result.isValid) {
//       const { id, username, id_level, id_horarios, cod_empresa } = result;

//       if (id_horarios === undefined) {
//         return res.status(400).json({ message: 'Horarios ID is missing' });
//       }

//       const id_hora = typeof id_horarios === 'string' ? parseInt(id_horarios) : id_horarios;
//       const verifyHorario = await getOneHorarios("horarios", id_hora);
//       const { descripcion } = verifyHorario;

//       if (id && username) {
//         const token = generateToken({ id, username });

//         // Emitir evento a través de Socket.IO
//         io.emit('loginSuccess', { id, username, id_level });

//         return res.status(200).json({
//           message: 'Login successful',
//           token,
//           id_level,
//           username,
//           id,
//           id_horarios,
//           cod_empresa,
//         });
//       }
//     }

//     return res.status(401).json({ message: 'Usuario o Contraseña Incorrecta' });
//   } catch (error) {
//     console.error("Error in loginController:", error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };
