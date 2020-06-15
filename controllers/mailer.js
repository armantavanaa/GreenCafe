const nodemailer = require("nodemailer");
const auth = require('../../auth.js');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: auth
}); 

module.exports = function(address, subject, content, callback){

  const mailOptions = {
      from: `Green Cafe<${auth.user}>`,
      to: address,
      subject: subject,
      text: content
  };

  transporter.sendMail(mailOptions, function(error, response) {
      callback(error, response);
  }); 

};
