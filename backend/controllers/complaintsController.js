const pool = require('../config/db');

exports.submitComplaint = async (req, res) => {
  const {
    citizen_name,
    email,
    category,
    message,
    agency_id
  } = req.body;

  const user_id = req.user.id; //  Injected by middleware

  try {
    const result = await pool.query(
      `INSERT INTO complaints
       (citizen_name, email, category, message, agency_id, user_id, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'Pending', NOW())
       RETURNING *`,
      [citizen_name, email, category, message, agency_id, user_id]
    );
    res.status(201).json({ message: 'Complaint submitted', complaint: result.rows[0] });
  } catch (err) {
    console.error('Error submitting complaint:', err);
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
};

