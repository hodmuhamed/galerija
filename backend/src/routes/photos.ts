import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { uploadPhotos } from '../controllers/photoController';
import multer from 'multer';

const router = express.Router();

// Configure multer for memory storage to process with sharp
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

router.post('/upload/:galleryId', protect, upload.array('photos', 20), uploadPhotos);

export default router;