import { Pool } from 'pg';
import dotenv from 'dotenv';
// FIX: Import `exit` from process to resolve typing issue with `process.exit()`
import { exit } from 'process';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If DATABASE_URL is not set, it will use the default PG environment variables
  // (PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT)
  // Or you can configure it manually:
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: parseInt(process.env.DB_PORT || "5432"),
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  // FIX: Use imported `exit` instead of `process.exit`
  exit(-1);
});

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};