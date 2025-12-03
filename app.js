var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var mongoose = require('mongoose');
var cors = require('cors');

// Routes
const authRoutes = require('./src/routes/auth');
const projetRoute = require('./src/routes/projetRoute');

var app = express();

// =============================
//  Connexion MongoDB
// =============================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// =============================
//  Middlewares
// =============================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:4200'], // Angular
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// =============================
//  Routes
// =============================
app.use('/api/auth', authRoutes);
app.use('/api/projets', projetRoute);

// =============================
//  Route 404 JSON
// =============================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// =============================
//  Error Handler JSON
// =============================
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error"
  });
});

module.exports = app;

