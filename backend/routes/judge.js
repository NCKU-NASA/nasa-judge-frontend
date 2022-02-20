const express = require('express');
const createError = require('http-errors');
const User = require('../models/user');
const Lab = require('../models/lab');
const path = require('path');
const fs = require('fs');
const auth = require('../middlewares/auth');
const multer  = require('multer')
const router = express.Router();

const uploadPath = path.join(__dirname, '../files');
const upload = multer({ dest: uploadPath });
const maxUploadCount = 20;

router.post('/', auth.checkSignIn, upload.array('uploads', maxUploadCount), async function(req, res, next) {
  try {
    const lab = await Lab.getLab(req.body.id);
    if (!lab) {
      throw createError(404);
    }
    const studentId = req.session.user.studentId;
    placeUploadFiles(req.files, studentId, lab);

    // TODO: send request to judge server
    // TODO: save score

    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
  removeTempFiles(req.files);
});

// move files according to lab.contents[i].name and place every file in user's dir
function placeUploadFiles(files, subdir, lab) {
  // find upload entries
  const contents = lab.contents.filter((content) => content.type === 'upload');
  if (contents.length !== files.length) {
    throw createError(400, 'The number of files did not match');
  }
  // rename files
  files.forEach((file, i) => {
    fs.copyFileSync(path.join(uploadPath, file.filename), path.join(uploadPath, `${subdir}/${contents[i].name}`));
  });
}

function removeTempFiles(files) {
  files.forEach((file) => {
    fs.rm(file.path, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
}

module.exports = router;
