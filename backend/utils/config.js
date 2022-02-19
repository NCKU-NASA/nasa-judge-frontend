require('dotenv').config();
const fs = require('fs');

const requiredVars = [
  'DB_NAME',
  'DB_USER',
  'DB_PASSWD'
];
const lackVars = [];

function createFilesDir() {
  fs.mkdirSync('files', { recursive: true });
}

function config() {
  requiredVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      lackVars.push(envVar);
    }
  });
  if (lackVars.length !== 0) {
    console.error(`ERROR: Environment variables ${lackVars.join(', ')} not set.`);
    process.exit(1);
  }
  createFilesDir();
}

module.exports = {
  config
};
