// Main Express server for IdeogramFIRE
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });

// Log environment variables for debugging
console.log('Environment variables loaded:');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');
console.log('IDEOGRAM_API_KEY:', process.env.IDEOGRAM_API_KEY ? 'Present' : 'Missing');
console.log('PORT:', process.env.PORT);

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Serve static frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API routes
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// Fallback to frontend for any other route
app.get('*', (req, res) => {
  console.log(`[${new Date().toISOString()}] Serving frontend for ${req.url}`);
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error.',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('CORS enabled for:', corsOptions.origin);
}); 