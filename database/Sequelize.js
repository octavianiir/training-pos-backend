const Sequelize = require("sequelize");
const ContentArray = require("../utils/ContentArray");

const DB_HOST = process.env.POSTGRES_DB_HOST;
const DB_USER = process.env.POSTGRES_DB_USER;
const DB_PASS = process.env.POSTGRES_DB_PASS;
const DB_PORT = process.env.POSTGRES_DB_PORT;
const DB_NAME = process.env.POSTGRES_DB_NAME;


const connection = new Sequelize(DB_NAME, DB_USER, DB_PASS, { 
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false 
});

let models = {};
const tables = ContentArray("tables");

for (const t of tables) {
  let table = require(t.path);
  models[table.table] = connection.define(
    table.table,
    table.fields,
    { freezeTableName: true }
  );
}

// connection.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch((error) => {
//   console.error('Unable to connect to the database: ', error);
// });


module.exports = { connection, models };