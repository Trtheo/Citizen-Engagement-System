const express = require('express');
const router = express.Router();
const { getAllAgencies, createAgency } = require('../models/Agency');

// GET all agencies
router.get('/', async (req, res) => {
  try {
    const agencies = await getAllAgencies();
    res.json(agencies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new agency
router.post('/', async (req, res) => {
  try {
    const agency = await createAgency(req.body.name);
    res.status(201).json(agency);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
