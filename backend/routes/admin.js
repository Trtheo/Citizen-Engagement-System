const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Admin-only dashboard route
router.get('/dashboard', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ message: `Welcome to the admin dashboard, ${req.user.email}` });
});

module.exports = router;
