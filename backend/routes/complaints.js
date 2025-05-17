const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getAllComplaints,
  updateStatus,
  getComplaintsByEmail,
} = require('../models/Complaint');
const authMiddleware = require('../middleware/authMiddleware');

//  Submit complaint (user must be authenticated)
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // injected from token
    const complaintData = {
      ...req.body,
      user_id: userId
    };
    const complaint = await createComplaint(complaintData);
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Admin: Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await getAllComplaints();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Update complaint status
router.put('/status/:id', async (req, res) => {
  try {
    const updated = await updateStatus(req.params.id, req.body.status);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Get complaints by citizen email
router.get('/user/:email', async (req, res) => {
  try {
    const complaints = await getComplaintsByEmail(req.params.email);
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
