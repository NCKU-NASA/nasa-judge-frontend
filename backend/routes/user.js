var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  if (req.body.username === 'a' && req.body.password === 'b') {
    res.send('respond with a resource');
  }
  else {
    res.sendStatus(401);
  }
});

module.exports = router;
