const multer = require("multer");

const storageLocation = process.env.STORAGE_LOCATION;

let multerinit = multer({dest: storageLocation});

module.exports = multerinit;