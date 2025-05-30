const fs = require("fs");

module.exports = (link, dest) => {
  return fs.copyFileSync(link, dest);
}