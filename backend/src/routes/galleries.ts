import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getGalleries, addGallery, getGalleryById } from '../controllers/galleryController';

const router = express.Router();

router.route('/')
  .get(protect, getGalleries)
  .post(protect, addGallery);

router.route('/:id')
  .get(protect, getGalleryById);

export default router;