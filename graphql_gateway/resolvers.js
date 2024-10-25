// resolvers.js

import { pool } from '../db.js';  // Import the PostgreSQL pool for database queries

const resolvers = {
  Query: {
    // Fetch a user by ID
    async getUser(_, { id }) {
      try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
      } catch (error) {
        throw new Error('Failed to fetch user: ' + error.message);
      }
    },

    // Fetch all available jobs
    async getJobs() {
      try {
        const result = await pool.query('SELECT * FROM jobs');
        return result.rows;
      } catch (error) {
        throw new Error('Failed to fetch jobs: ' + error.message);
      }
    },
  },

  Mutation: {
    // Create a new user
    async createUser(_, { userInput }) {
      const { name, email, password } = userInput;
      try {
        const result = await pool.query(
          'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
          [name, email, password]
        );
        return result.rows[0];
      } catch (error) {
        throw new Error('Failed to create user: ' + error.message);
      }
    },

    // Create a new job
    async createJob(_, { jobInput }) {
      const { title, description, company, salary } = jobInput;
      try {
        const result = await pool.query(
          'INSERT INTO jobs (title, description, company, salary) VALUES ($1, $2, $3, $4) RETURNING *',
          [title, description, company, salary]
        );
        return result.rows[0];
      } catch (error) {
        throw new Error('Failed to create job: ' + error.message);
      }
    },
  },
};

export default resolvers;
