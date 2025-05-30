const nodemailer = require("nodemailer");
const Loggers = require("../Loggers");

const transporter = nodemailer.createTransport({
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

module.exports = async (title, body) => {
  try {
    
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}