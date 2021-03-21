// データベースの設定
const db = require('mysql2');

const connection = db.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_IMAGE,
});

module.exports = connection;
