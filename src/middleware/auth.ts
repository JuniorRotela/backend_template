// src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'default_secret_key';


export const generateToken = (user: { id: number; username: string }) => {
  return jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: '8h',
  });
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extrae el token de la cabecera

  // console.log('Authorization header:', req.headers['authorization']); // Log del encabezado de autorización
  // console.log('Received token:', token); // Log del token recibido

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    // console.log('Decoded token:', decoded); // Log del token decodificado
    (req as any).decodedToken = decoded; // Usa casting para evitar errores de tipo
    next();
  }catch (err) {
    const error = err as jwt.JsonWebTokenError; // Casting explícito

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado. Por favor, inicia sesión nuevamente.' });
    }
    // console.error('Token verification error:', err); // Log del error
    res.status(400).json({ message: 'Invalid token.' });
  }
};
