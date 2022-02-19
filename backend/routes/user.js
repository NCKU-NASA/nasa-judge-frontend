const express = require('express');
const User = require('../models/user');
const path = require('path');
const router = express.Router();

router.post('/login', function(req, res, next) {
  if (req.body.studentId === 'a' && req.body.password === 'b') {
    res.send('Login success');
  }
  else {
    res.sendStatus(401);
  }
});

router.get('/config', async function(req, res, next) {
  res.sendFile(path.join(__dirname, '../files/test.7z'));
});

module.exports = router;
