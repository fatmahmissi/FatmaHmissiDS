var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var mongoose = require('mongoose');
var cors = require('cors');

// Routes


var app = express();

// =============================
//  Connexion MongoDB
// =============================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB database connected"))
  .catch(err => console.error(" MongoDB error:", err));


// =============================
//  Middlewares
// =============================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS si tu utilises Angular
app.use(cors({
  origin: ['http://localhost:4200'],
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// =============================
//  Routes
// =============================



// =============================
//  Gestion 404
// =============================
app.use(function(req, res, next) {
  next(createError(404));
});

// =============================
//  Error Handler
// =============================
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
