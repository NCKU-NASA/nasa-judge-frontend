const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
  const labs = [
    {
      id: 'Lab 1',
      contents: [
        { type: 'download', link: '/test', text: 'config' },
        { type: 'upload', link: '/hello', text: 'CA cert' },
      ],
    },
    {
      id: 'Lab 2',
      contents: [
        { type: 'download', link: '/test2', text: 'config2' },
      ],
    }
  ];
  res.send({ labs });
});

module.exports = router;
