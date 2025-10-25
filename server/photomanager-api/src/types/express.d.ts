// src/types/express.d.ts
// ---------------------------------------------------------------------------
// Ovo proširuje Express Request interfejs tako da uključuje `user` property.
// `authMiddleware` postavlja dekodirani JWT payload u req.user,
// čime omogućava tipiziran pristup korisničkim podacima unutar kontrolera.
// ---------------------------------------------------------------------------

import "express";

declare global {
  interface AuthenticatedUser {
    id: string | number;
    role: "Admin" | "User" | "Viewer";
  }
}

declare module "express" {
  export interface Request {
    user?: AuthenticatedUser;
  }
}

