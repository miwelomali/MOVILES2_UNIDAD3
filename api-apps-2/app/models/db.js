const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Crear conexion a la base de datos
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

//Abrir la conexion a la base de datos
connection.connect(error => {
  if (error) throw error;
  console.log("Conexion exitosa a la base de datos.");
});

module.exports = connection;
