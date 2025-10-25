// This file extends the Express Request interface to include a `user` property.
// The `authMiddleware` will attach the decoded JWT payload to `req.user`.
import { User } from './index';

interface AuthenticatedUser {
  id: string;
  role: User['role'];
}

declare namespace Express {
  export interface Request {
    user?: AuthenticatedUser;
  }
}