
import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

console.log('PostgreSQL Pool initialized successfully');

export default pool;

if (!process.env.PG_USER || !process.env.PG_HOST || !process.env.PG_DATABASE || !process.env.PG_PASSWORD || !process.env.PG_PORT) {
    console.error('Missing one or more PostgreSQL environment variables.');
    process.exit(1);
  }
  