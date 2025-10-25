import { Request, Response } from "express";
import pool from "../services/db"; // ✅ koristi isti pool kao i authController

// Lokalni tip za City (nije obavezan ali pomaže TypeScriptu)
type City = {
  id: number;
  name: string;
  country: string;
  user_id: number;
  created_at: string;
};

// @desc    Get all cities for the logged-in user
// @route   GET /api/cities
// @access  Private
export const getCities = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM cities WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user!.id]
    );

    res.status(200).json(result.rows as City[]);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Server error while fetching cities" });
  }
};

// @desc    Add a new city
// @route   POST /api/cities
// @access  Private
export const addCity = async (req: Request, res: Response) => {
  const { name, country }: { name: string; country: string } = req.body;

  if (!name || !country) {
    return res
      .status(400)
      .json({ message: "Please provide both name and country" });
  }

  try {
    const newCityQuery = `
      INSERT INTO cities (user_id, name, country)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(newCityQuery, [req.user!.id, name, country]);

    res.status(201).json(result.rows[0] as City);
  } catch (error) {
    console.error("Error adding city:", error);
    res.status(500).json({ message: "Server error while adding city" });
  }
};

