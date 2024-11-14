const sql = require("mssql");
require("dotenv").config();

const configBD = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(configBD)
  .connect()
  .then((pool) => {
    console.log("Conexión exitosa con SQL Server");
    return pool;
  })
  .catch((err) => console.log("Error en la conexión a la base de datos: ", err));

module.exports = { sql, poolPromise };
