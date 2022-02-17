const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/login', function(req, res, next) {
  if (req.body.username === 'a' && req.body.password === 'b') {
    res.send('Login success');
  }
  else {
    res.sendStatus(401);
  }
});

router.get('/config', async function(req, res, next) {
});

module.exports = router;
