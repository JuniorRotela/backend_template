// src/routes/protected.routes.ts

import { Router, Request, Response } from 'express';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.get('/protected', verifyToken, (req: Request, res: Response) => {
  const decodedToken = (req as any).decodedToken; // Accede a la propiedad personalizada si la usaste

  if (decodedToken) {
    res.json({ message: 'Access granted', user: decodedToken });
  } else {
    res.status(401).json({ message: 'Access denied' });
  }
});

export default router;
