const { Client } = require("pg");

module.exports = async () => {
  const DB_HOST = process.env.POSTGRES_DB_HOST;
  const DB_USER = process.env.POSTGRES_DB_USER;
  const DB_PASS = process.env.POSTGRES_DB_PASS;
  const DB_PORT = process.env.POSTGRES_DB_PORT;
  const DB_NAME = process.env.POSTGRES_DB_NAME;

  const client = new Client({
    host: DB_HOST,
    port: DB_PORT,
    database: "postgres",
    user: DB_USER,
    password: DB_PASS,
  });

  let sqlCheck = `SELECT WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${DB_NAME}')`;

  await client.connect();
  let queryCheck = await client.query(sqlCheck);
  if (queryCheck.rowCount > 0) {
    let sql = `CREATE DATABASE ${DB_NAME}`; 
    await client.query(sql);
  }
  await client.end();
}