var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')

var app = express();

const corsOption = {
  origin:"*",
  credential:true,
  methods:['GET','POST','DELETE','PUT']
}

// database connection
mongoose.connect("mongodb+srv://shivampathak5566677:M9PqMRpbKnymPReO@newssamachar.k6fxk.mongodb.net/?retryWrites=true&w=majority&appName=NewsSamachar")
app.use(cors(corsOption))
// view engine setup
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
app.use('/image', express.static(path.join(__dirname, 'uploads/images')))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
