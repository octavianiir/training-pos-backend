const fs = require("fs");

module.exports = (link) => {
  return fs.unlinkSync(link);
}