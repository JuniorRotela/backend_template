// src/middleware/auth.ts

import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'default_secret_key';

export const generateToken = (user: { id: number; username: string }) => {
  return jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: '8h',
  });
};