require("dotenv").config();
const { connection } = require("./database/Sequelize");
const ContentArray = require("./utils/ContentArray");
const { app, router } = require("./server/init")();
const DatabaseCreate = require("./utils/DatabaseCreate");

(async () => {
  const port = process.env.APP_PORT;
  await DatabaseCreate();

  const DB_ALTER = process.env.DB_ALTER == "true";
  const DB_FORCE = process.env.DB_FORCE == "true";

  connection.authenticate();
  connection.sync({ alter: DB_ALTER, force: DB_FORCE })
    .then(async () => {
      const initialData = ContentArray("initials");
      for (const i of initialData) {
        await require(i.path)(null, router);
      }

      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
    })
})()