const express = require('express');
const Lab = require('../models/lab');
const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const labs = await Lab.getLabs();
    res.send({ labs });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
