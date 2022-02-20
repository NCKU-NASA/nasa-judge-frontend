const con = require('../utils/database');
const table_name = 'user';

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
      studentId varchar(255) PRIMARY KEY,\
      password varchar(255)\
    )', [table_name]);
  }
});

function getUser(studentId) {
  if (!studentId) {
    return false;
  }
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM ?? WHERE studentId=? LIMIT 1'
      , [table_name, studentId], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.length === 0 ? undefined : result[0]);
    });
  });
}

function getUsers() {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM ??'
      , [table_name], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  isExists,
  getUser,
  getUsers,
};