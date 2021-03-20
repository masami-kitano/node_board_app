// データベースの設定
const db = require('mysql2');

const connection = db.createConnection({
  host: 'mydb',
  user: 'root',
  password: 'root',
  database: 'node_db',
});

module.exports = connection;
