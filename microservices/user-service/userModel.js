import express from 'express';
import bcrypt from 'bcrypt';
// Updated userModel.js

import { pool } from '../config/db.js';

// Create a new user
export const createUser = async (name, email, password_hash, user_type) => {
    const result = await pool.query(
        'INSERT INTO users (name, email, password_hash, user_type) VALUES ($1, $2, $3, $4) RETURNING id, name, email, user_type',
        [name, email, password_hash, user_type]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Find a user by email
export const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


// Encrypt user password before saving to DB
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
