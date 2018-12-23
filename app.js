'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var i18n = require('i18n');


var app = express();

//Internationalization module
app.use(i18n.init);

i18n.configure({
  locals: ['en','es'],
  directory: __dirname + '/locals'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//getting mongooseConnection and model definitions
require('./lib/mongooseConnection');
require('./models/Advert');
require('./models/User');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * API routes
 */
app.use('/apiv1/adverts', require('./routes/apiv1/adverts'));
app.use('/apiv1/users',require('./routes/apiv1/users'));

/**
 * Web Aplication routes
 */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



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
