const express = require('express');
const router = express.Router();

// Basic health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Add your routes here
// Example: router.use('/users', require('./routes/userRoutes'));

module.exports = router;
