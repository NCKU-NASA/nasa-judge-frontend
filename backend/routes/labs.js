const express = require('express');
const Lab = require('../models/lab');
const createError = require('http-errors');
const Score = require('../models/score');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const labs = await Lab.getLabs();
    res.send({ labs });
  } catch(err) {
    next(err);
  }
});

router.get('/:labId/score', auth.checkSignIn, async function(req, res, next) {
  try {
    const lab = await Lab.getLab(req.params.labId);
    if (!lab) {
      throw createError(404);
    }
    const studentId = req.session.user.studentId;
    const score = await Score.getMaxLabScore(studentId, lab.id);
    if (!score) {
      res.send({ score: 0 });
    }
    else {
      res.send({ score });
    }
  } catch(err) {
    next(err);
  }
});

module.exports = router;
