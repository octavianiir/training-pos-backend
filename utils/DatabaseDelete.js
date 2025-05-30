const { Client } = require("pg");
const { connection } = require("../database/Sequelize");

const DB_HOST = process.env.POSTGRES_DB_HOST;
const DB_USER = process.env.POSTGRES_DB_USER;
const DB_PASS = process.env.POSTGRES_DB_PASS;
const DB_PORT = process.env.POSTGRES_DB_PORT;
const DB_NAME = process.env.POSTGRES_DB_NAME;

module.exports = async () => {
  connection.close();

  const client = new Client({
    host: DB_HOST,
    port: DB_PORT,
    database: "postgres",
    user: DB_USER,
    password: DB_PASS,
  });

  await client.connect();
  await client.query(`DROP DATABASE ${DB_NAME}`);
  await client.end();
}