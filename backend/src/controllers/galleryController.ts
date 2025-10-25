import express from 'express';
import pool from '../services/db';

// @desc    Get galleries, optionally filtered by city
// @route   GET /api/galleries?cityId=:cityId
// @access  Private
export const getGalleries = async (req: express.Request, res: express.Response) => {
  const { cityId } = req.query;
  try {
    let query = `
        SELECT g.*, 
               COALESCE(
                 (SELECT json_agg(p.* ORDER BY p.taken_at DESC) 
                  FROM photos p 
                  WHERE p.gallery_id = g.id), 
                 '[]'::json
               ) as photos
        FROM galleries g
        WHERE g.user_id = $1
    `;
    const params: (string | undefined)[] = [req.user!.id];

    if (cityId) {
      query += ' AND g.city_id = $2';
      params.push(cityId as string);
    }
    
    query += ' ORDER BY g.updated_at DESC';

    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (error)
 {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single gallery by ID
// @route   GET /api/galleries/:id
// @access  Private
export const getGalleryById = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT g.*, 
                   COALESCE(
                     (SELECT json_agg(p.* ORDER BY p.taken_at DESC) 
                      FROM photos p 
                      WHERE p.gallery_id = g.id), 
                     '[]'::json
                   ) as photos
            FROM galleries g
            WHERE g.id = $1 AND g.user_id = $2
        `;
        const result = await pool.query(query, [id, req.user!.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// @desc    Add a new gallery
// @route   POST /api/galleries
// @access  Private
export const addGallery = async (req: express.Request, res: express.Response) => {
  const { cityId, address, houseNumber, tag, description } = req.body;
  
  if (!cityId || !address || !houseNumber || !tag) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const userResult = await pool.query('SELECT name FROM users WHERE id = $1', [req.user!.id]);
    if (userResult.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    const createdBy = userResult.rows[0].name;

    const newGalleryQuery = `
      INSERT INTO galleries (user_id, city_id, address, house_number, tag, description, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const result = await pool.query(newGalleryQuery, [req.user!.id, cityId, address, houseNumber, tag, description, createdBy]);
    
    const newGallery = result.rows[0];
    newGallery.photos = []; // Add empty photos array to match frontend type

    res.status(201).json(newGallery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};