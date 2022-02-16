require('./utils/config').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const db = require('./utils/database');
const logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.message);
  res.status(err.status || 500).send('Error occurred');
});

module.exports = app;
