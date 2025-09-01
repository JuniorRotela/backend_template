// src/controllers/someController.ts
import { Request, Response } from 'express';

export const someHandler = (req: Request, res: Response) => {
  const user = res.locals.user;
  
  if (user) {
    // Puedes usar la información del usuario aquí
    res.json({ message: 'User data:', user });
  } else {
    res.status(403).json({ message: 'No user data available.' });
  }
};
