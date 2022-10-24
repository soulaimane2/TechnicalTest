"use strict";
const nodemailer = require("nodemailer");

async function sendMail({confirmationCode, email}) {
    
  let testAccount = await nodemailer.createTestAccount();


  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "698e659e56a781",
      pass: "7a4ee20968bedc"
    }
  });


  let info = await transport.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: email,
    subject: "Verify your email",
    text: "Would you like to verify your email?", 
    html: `<b>your confirmation code is: ${confirmationCode} </b>`,
  });

  console.log("Message sent: %s", info.messageId);

  if(info.rejected) return {error: true, message: info}

  if(info.accepted) return {error: false, message:info}

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}



module.exports = sendMail