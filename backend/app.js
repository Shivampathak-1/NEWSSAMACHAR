var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();

const corsOption = {
  origin: "*",
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT']
};

app.use(cors(corsOption));

// Database connection with error handling
mongoose.connect("mongodb+srv://shivampathak5566677:M9PqMRpbKnymPReO@newssamachar.k6fxk.mongodb.net/NewsSamachar?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsAllowInvalidCertificates: true
})
.then(() => console.log("Connected to MongoDB ✅"))
.catch(err => console.error("MongoDB Connection Error ❌", err));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Available routes
app.use('/', require('./routes/home'));
app.use('/auth', require('./routes/auth'));
app.use('/uploads', require('./routes/uploadImg'));
app.use('/image', express.static(path.join(__dirname, 'uploads/images')));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
