const express = require('express');
const cors = require('cors');
const cryptoRoutes = require('./routes/cryptoRoutes');
const cryptoService = require('./cryptoService');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend integration
app.use(cors());

// Enable JSON middleware
app.use(express.json());

// Initialize server RSA key pair session
cryptoService.getActiveKeys();

// Register Cryptography Routes
app.use('/api', cryptoRoutes);

// Educational Landing Endpoint
app.get('/', (req, res) => {
  res.json({
    title: 'Secure Message System API',
    description: 'Educational Cryptography Service (RSA 2048, SHA-256, RSA-PSS, RSA-OAEP)',
    disclaimer: 'Educational Demonstration — Not intended for production security.',
    status: 'Running'
  });
});

// Centralized Error Handling
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'An unexpected cryptographic or server error occurred.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`SECURE MESSAGE SYSTEM BACKEND RUNNING ON PORT ${PORT}`);
  console.log(`API Base URL: http://localhost:${PORT}/api`);
  console.log(`Educational Demonstration — Not intended for production security.`);
  console.log(`==================================================`);
});

module.exports = app;
