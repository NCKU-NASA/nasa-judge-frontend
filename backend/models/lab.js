const con = require('../utils/database');
const table_name = 'lab';

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
      id varchar(255) PRIMARY KEY,\
      contents JSON\
    )', [table_name]);
  }
});

function getLabs() {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM ??'
      , [table_name], (err, rows) => {
      if (err) {
        reject(err);
      }
      rows.forEach((row) => {
        try {
          row.contents = JSON.parse(row.contents);
        } catch(err) {
          reject(err);
        }
      });
      resolve(rows);
    });
  });
}

module.exports = {
  getLabs,
};