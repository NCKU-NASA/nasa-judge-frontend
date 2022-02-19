const con = require('../utils/database');
const table_name = 'score';

function isExists() {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM information_schema.tables WHERE table_schema=? AND table_name=? LIMIT 1'
      , [process.env.DB_NAME, table_name], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.length === 1);
    });
  });
}

isExists().then((result) => {
  if (!result) {
    con.query('CREATE TABLE ?? (\
      scoreId int,\
      studentId varchar(255),\
      labId varchar(255),\
      score int,\
      result text\
    )', [table_name]);
  }
});

function getScores() {
}

function addScore(studentId, labId, score, result) {
}

module.exports = {
  isExists,
  getUser,
};