const pool = require('../config/db');

const getAllAgencies = async () => {
  const result = await pool.query('SELECT * FROM agencies ORDER BY id');
  return result.rows;
};

const createAgency = async (name) => {
  const existing = await pool.query(
    'SELECT * FROM agencies WHERE name = $1',
    [name]
  );
  if (existing.rows.length > 0) {
    return existing.rows[0]; // return existing instead of inserting
  }

  const result = await pool.query(
    'INSERT INTO agencies (name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
};


module.exports = { getAllAgencies, createAgency };
