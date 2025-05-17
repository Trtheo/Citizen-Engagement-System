// === File: backend/models/Complaint.js ===
const pool = require('../config/db');

// Create a new complaint
const createComplaint = async (data) => {
  const { citizen_name, email, category, message, agency_id } = data;
  const result = await pool.query(
    `INSERT INTO complaints (citizen_name, email, category, message, agency_id, status)
     VALUES ($1, $2, $3, $4, $5, 'Pending') RETURNING *`,
    [citizen_name, email, category, message, agency_id]
  );
  return result.rows[0];
};

// Get all complaints (for admin)
const getAllComplaints = async () => {
  const result = await pool.query(`
    SELECT 
      c.id, 
      c.citizen_name, 
      c.email, 
      c.category, 
      c.message, 
      c.status, 
      c.agency_id,
      c.created_at,
      a.name AS agency_name 
    FROM complaints c
    LEFT JOIN agencies a ON c.agency_id = a.id
    ORDER BY c.created_at DESC
  `);
  return result.rows;
};

// Update complaint status
const updateStatus = async (id, status) => {
  const result = await pool.query(
    'UPDATE complaints SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};

// Get complaints by email (for citizen)
const getComplaintsByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM complaints WHERE email = $1 ORDER BY created_at DESC',
    [email]
  );
  return result.rows;
};

module.exports = {
  createComplaint,
  getAllComplaints,
  updateStatus,
  getComplaintsByEmail
};
