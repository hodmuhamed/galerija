import { Request, Response } from 'express';
import db from '../services/db';
import { City } from '../../../types';

// @desc    Get all cities for the logged-in user
// @route   GET /api/cities
// @access  Private
export const getCities = async (req: Request, res: Response) => {
  try {
    const result = await db.query('SELECT * FROM cities WHERE user_id = $1 ORDER BY created_at DESC', [req.user!.id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add a new city
// @route   POST /api/cities
// @access  Private
export const addCity = async (req: Request, res: Response) => {
  const { name, country }: { name: string; country: string } = req.body;
  
  if (!name || !country) {
    return res.status(400).json({ message: 'Please provide name and country' });
  }

  try {
    const newCityQuery = `
      INSERT INTO cities (user_id, name, country)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await db.query(newCityQuery, [req.user!.id, name, country]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
