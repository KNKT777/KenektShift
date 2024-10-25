import { pool } from '../config/db.js';

const resolvers = {
  Query: {
    getBillingById: async (_, { id }) => {
      const result = await pool.query('SELECT * FROM billings WHERE id = $1', [id]);
      return result.rows[0];
    },
    getAllBillings: async () => {
      const result = await pool.query('SELECT * FROM billings');
      return result.rows;
    },
  },
  Mutation: {
    createBilling: async (_, { userId, amount, status }) => {
      const result = await pool.query(
        'INSERT INTO billings (user_id, amount, status) VALUES ($1, $2, $3) RETURNING *',
        [userId, amount, status]
      );
      return result.rows[0];
    },
    updateBillingStatus: async (_, { id, status }) => {
      const result = await pool.query(
        'UPDATE billings SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      return result.rows[0];
    },
  },
};

export default resolvers;
