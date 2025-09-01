// types/express.d.ts

import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Extiende el Request para incluir 'user'
    }
  }
}
