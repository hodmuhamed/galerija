import express from 'express';
import 'multer'; // For Express.Multer.File type augmentation
import pool from '../services/db';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { Photo } from '../types';

// Ensure the upload directory exists
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// @desc    Upload photos to a gallery
// @route   POST /api/photos/upload/:galleryId
// @access  Private
export const uploadPhotos = async (req: express.Request, res: express.Response) => {
  const { galleryId } = req.params;
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  try {
    // 1. Verify gallery ownership
    const galleryResult = await pool.query(
      'SELECT tag, user_id FROM galleries WHERE id = $1',
      [galleryId]
    );

    if (galleryResult.rows.length === 0) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    if (galleryResult.rows[0].user_id !== req.user!.id) {
      return res.status(403).json({ message: 'User not authorized to upload to this gallery' });
    }
    const galleryTag = galleryResult.rows[0].tag;

    // 2. Get uploader's name
    const userResult = await pool.query('SELECT name FROM users WHERE id = $1', [req.user!.id]);
    const uploadedBy = userResult.rows[0].name;

    const uploadedPhotos: Photo[] = [];

    // 3. Process and save each file
    for (const file of files) {
      const filename = `${uuidv4()}.jpeg`;
      const filepath = path.join(uploadDir, filename);

      await sharp(file.buffer)
        .resize({ width: 1920, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 75 })
        .toFile(filepath);

      const fileUrl = `/uploads/${filename}`;
      
      const newPhotoQuery = `
        INSERT INTO photos (gallery_id, user_id, url, tag, uploaded_by, taken_at, description)
        VALUES ($1, $2, $3, $4, $5, NOW(), $6)
        RETURNING id, gallery_id, user_id, url, tag, uploaded_by, description, taken_at, created_at
      `;
      const newPhotoResult = await pool.query(newPhotoQuery, [
        galleryId,
        req.user!.id,
        fileUrl,
        galleryTag,
        uploadedBy,
        'Newly uploaded photo.'
      ]);
      
      const savedPhoto: Photo = newPhotoResult.rows[0];
      uploadedPhotos.push(savedPhoto);
    }
    
    // 4. Update gallery's updated_at timestamp
    await pool.query('UPDATE galleries SET updated_at = NOW() WHERE id = $1', [galleryId]);

    res.status(201).json({ message: 'Photos uploaded successfully', photos: uploadedPhotos });
  } catch (error) {
    console.error('Error during photo upload:', error);
    res.status(500).json({ message: 'Server error during file upload' });
  }
};