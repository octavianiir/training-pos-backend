const fs = require("fs");

module.exports = (loc) => {
  return fs.readdirSync(loc);
}