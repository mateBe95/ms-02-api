// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    res.json({
      success: true,
      data: [
        { id: 1, name: 'Jan Kowalski', email: 'jan@example.com' },
        { id: 2, name: 'Anna Nowak', email: 'anna@example.com' }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/users', async (req, res) => {
  // ... twoja logika
});

module.exports = router;