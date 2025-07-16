import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../types';

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    
    req.user = user as AuthPayload;
    next();
  });
};