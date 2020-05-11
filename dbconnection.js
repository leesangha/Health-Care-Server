const Mssql = require("mssql");

const userConfig = {
  user: "maetadmin",
  password: "1q2w3e4r5!",
  server: "223.194.46.65",
  port: 3999,
  database: "maetdb",
};
const connection = new Mssql.ConnectionPool(userConfig);
connection.connect()
  .then(() => console.log('Success maetdb connect'))
  .catch((err) => console.error(err));

module.exports = connection;
