const express = require('express');
const router = express.Router();
const events = require('../models/events');

// GET /events - Get all events across all churches for home view
router.get('/', async (req, res, next) => {
  try {
    const allEvents = await events.getAll();
    res.json(allEvents);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
