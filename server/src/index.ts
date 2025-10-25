import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
// FIX: Import `cwd` from process to resolve typing issue with `process.cwd()`
import { cwd } from 'process';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth';
import cityRoutes from './routes/cities';
import galleryRoutes from './routes/galleries';
import photoRoutes from './routes/photos';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
// FIX: Use imported `cwd` instead of `process.cwd`
app.use('/uploads', express.static(path.resolve(cwd(), uploadDir)));

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/photos', photoRoutes);


// Basic Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // FIX: Use imported `cwd` instead of `process.cwd`
  console.log(`Serving uploads from: ${path.resolve(cwd(), uploadDir)}`);
});