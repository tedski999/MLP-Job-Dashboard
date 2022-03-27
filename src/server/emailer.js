const nodemailer = require("nodemailer");

async function main() {
	//Create test account
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, //can update when mail server is setup properly (true=port 465)
    auth: {
      user: testAccount.user, // generated test user
      pass: testAccount.pass, // generated test password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Creagh D" <cd@etherealmail.com', // sender address
    to: "xevomet345@jooffy.com", // can have multiple receivers delimeted with comma
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body alternative
  });

  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

main().catch(console.error);
