import { Request, Response } from "express";
import pool from "../services/db";
import fs from "fs";
import path from "path";
import sharp from "sharp";

// Lokalni tip za Photo
type Photo = {
  id: number;
  gallery_id: number;
  url: string;
  tag?: string;
  description?: string;
  uploaded_by: string;
  created_at: string;
  taken_at?: string;
};

// 📸 Get all photos for a gallery
export const getPhotosByGallery = async (req: Request, res: Response) => {
  const galleryId = req.params.id;

  try {
    const result = await pool.query(
      "SELECT * FROM photos WHERE gallery_id = $1 ORDER BY created_at DESC",
      [galleryId]
    );
    res.status(200).json(result.rows as Photo[]);
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ message: "Server error while fetching photos" });
  }
};

// 📥 Upload a new photo
export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadDir = "/var/www/photomanager-api/uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const originalPath = path.join(uploadDir, req.file.filename);
    const compressedPath = path.join(uploadDir, `compressed-${req.file.filename}`);

    // 🔹 Kompresuj sliku pomoću Sharp
    await sharp(req.file.path)
      .resize(1600) // širina max 1600px
      .jpeg({ quality: 80 })
      .toFile(compressedPath);

    // Obriši originalni upload
    fs.unlinkSync(req.file.path);

    // 📅 Datum slike – koristi multer file info
    const takenAt = req.file.originalname
      ? new Date()
      : new Date(Date.now());

    const photoUrl = `/uploads/${path.basename(compressedPath)}`;

    const result = await pool.query(
      `INSERT INTO photos (gallery_id, url, uploaded_by, tag, created_at, taken_at)
       VALUES ($1, $2, $3, $4, NOW(), $5)
       RETURNING *`,
      [
        req.body.gallery_id,
        photoUrl,
        req.user!.id,
        req.body.tag || null,
        takenAt,
      ]
    );

    res.status(201).json(result.rows[0] as Photo);
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ message: "Server error while uploading photo" });
  }
};

// 🗑️ Delete a photo
export const deletePhoto = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const photoResult = await pool.query("SELECT url FROM photos WHERE id = $1", [id]);

    if (photoResult.rows.length === 0) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const photo = photoResult.rows[0];
    const filePath = path.join("/var/www/photomanager-api", photo.url);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await pool.query("DELETE FROM photos WHERE id = $1", [id]);
    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ message: "Server error while deleting photo" });
  }
};

