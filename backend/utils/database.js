const mysql = require('mysql');
const connection = mysql.createConnection({
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWD,
  databases: process.env.DB_NAME
});
 
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});