const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
    host: config.SERVER_DB,
    password: config.PASSWORD_DB,
    user: config.USER_DB,
    database: config.NAME_DB,
    multipleStatements: true
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.message);
      return;
    }   
    console.log('Conectado a mysql');
  });

module.exports = connection;