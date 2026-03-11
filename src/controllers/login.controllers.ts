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
    const result = await verifyUser('users', { username, password });

    console.log('Result from verifyUser:', result); // Agrega este log

    if (result.isValid) {
      // Verifica que result tenga id y username
      const { id, username, id_level, id_sucursal } = result;

      if (id && username) {
        // Generar el token JWT
        const token = generateToken({ id, username });

        return res.status(200).json({
          message: 'Login successful',
          token, // Incluir el token en la respuesta
          id_level,
          username,
          id,
          id_sucursal,
        });
      }
    }

    return res.status(401).json({ message: 'Usuario o Contraseña Incorrecta' });
  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
