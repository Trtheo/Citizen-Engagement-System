const express = require('express');
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.put('/change-password', authMiddleware, changePassword);
router.put('/update-profile', authMiddleware, updateProfile);

module.exports = router;
