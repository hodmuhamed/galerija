import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types';

interface JwtPayload {
  id: string;
  role: User['role'];
}

export const protect = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      // Attach user to the request object
      req.user = { id: decoded.id, role: decoded.role };
      
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};