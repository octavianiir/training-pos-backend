const express = require("express");
const cors = require("cors");
const ContentArray = require("../utils/ContentArray");
// const { passport_authenticate_session, session } = require("../utils/Passport/PassportGoogle");

function createServer() { 
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: "*" }));
  // app.use(session);
  // app.use(passport_authenticate_session);
  app.get("/", (req, res) => { res.json("it works") });

  const router = express.Router();
  let routes = {};
  const routesList = ContentArray("routes");
  for (const r of routesList) {
    routes[r.name] = require(r.path)(router);
  }

  app.use("/", router);
  // app.use("/static/file", express.static(process.env.STORAGE_LOCATION));
  return {app, router};
}

module.exports = createServer;