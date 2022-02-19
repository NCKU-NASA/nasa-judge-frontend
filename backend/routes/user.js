const express = require('express');
const createError = require('http-errors');
const User = require('../models/user');
const path = require('path');
const auth = require('../middlewares/auth');
const router = express.Router();
const configFilename = 'lab_config.zip';

router.post('/login', async function(req, res, next) {
  try {
    const user = await User.getUser(req.body.studentId);
    if (!user || req.body.password !== user.password) {
      throw createError(401, 'StudentId or password incorrect');
    }
    req.session.user = {
      studentId: user.studentId,
    };
    res.send('Login success');
  } catch(err) {
    next(err);
  }
});

router.get('/config', auth.checkSignIn, async function(req, res, next) {
  res.sendFile(path.join(__dirname, `../files/${ req.session.user.studentId }/${ configFilename }`));
});

module.exports = router;
