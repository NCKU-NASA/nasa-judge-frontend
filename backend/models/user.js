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
      student_id varchar(255) PRIMARY KEY,\
      password varchar(255),\
      config_path varchar(255)\
    )', [table_name]);
  }
});

function getUser(student_id) {
  if (!student_id) {
    return false;
  }
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM ?? WHERE student_id=?'
      , [table_name, student_id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  isExists,
  getUser,
  
};