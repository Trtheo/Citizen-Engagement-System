const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../config/mailer');
const crypto = require('crypto');
const generateToken = require('../utils/generateToken');
const cloudinary = require('cloudinary').v2;

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, profile_image } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role, profile_image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashed, 'citizen', profile_image || null]
    );
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid input' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = userRes.rows[0];

  if (!user) return res.status(400).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = generateToken(user.id, user.role, user.email);

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profile_image: user.profile_image
    }
  });
};

// Change Password
exports.changePassword = async (req, res) => {
  const { newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);
  try {
    await pool.query('UPDATE users SET password=$1 WHERE id=$2', [hashed, req.user.id]);
    res.json({ message: 'Password changed successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to update password' });
  }
};

// Update Profile (name and profile image)
exports.updateProfile = async (req, res) => {
  const { name, imageBase64 } = req.body;

  try {
    let profile_image = null;

    if (imageBase64) {
      const uploadRes = await cloudinary.uploader.upload(imageBase64, {
        folder: 'citizen_system_profiles'
      });
      profile_image = uploadRes.secure_url;
    }

    const result = await pool.query(
      'UPDATE users SET name=$1, profile_image=$2 WHERE id=$3 RETURNING *',
      [name, profile_image, req.user.id]
    );

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(20).toString('hex');
  const expires = new Date(Date.now() + 3600000);

  try {
    const update = await pool.query(
      'UPDATE users SET reset_token=$1, reset_expires=$2 WHERE email=$3 RETURNING *',
      [token, expires, email]
    );

    if (!update.rowCount) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: '"Citizen System" <no-reply@citizensystem.local>',
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`
    });

    res.json({ message: 'Password reset link sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const userRes = await pool.query(
      'SELECT * FROM users WHERE reset_token=$1 AND reset_expires > NOW()',
      [token]
    );

    if (!userRes.rowCount) return res.status(400).json({ error: 'Invalid or expired token' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query(
      'UPDATE users SET password=$1, reset_token=NULL, reset_expires=NULL WHERE id=$2',
      [hashed, userRes.rows[0].id]
    );

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error resetting password' });
  }
};
