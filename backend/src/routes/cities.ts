import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getCities, addCity } from '../controllers/cityController';

const router = express.Router();

router.route('/')
  .get(protect, getCities)
  .post(protect, addCity);

export default router;