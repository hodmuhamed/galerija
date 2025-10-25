// This file extends the Express Request interface to include a `user` property.
// The `authMiddleware` will attach the decoded JWT payload to `req.user`.

interface AuthenticatedUser {
  id: string;
  role: 'Admin' | 'User' | 'Viewer';
}

declare namespace Express {
  export interface Request {
    user?: AuthenticatedUser;
  }
}
