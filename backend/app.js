require('./utils/config').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var labsRouter = require('./routes/labs');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/labs', labsRouter);

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
