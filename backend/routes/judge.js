const express = require('express');
const createError = require('http-errors');
const User = require('../models/user');
const path = require('path');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', async function(req, res, next) {
  try {
    // send request to judge server

    // save score

  } catch(err) {
    next(err);
  }
});

module.exports = router;
