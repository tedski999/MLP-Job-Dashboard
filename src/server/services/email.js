const nodemailer = require("nodemailer");
const { services } = require("../../config.json");

const transport = nodemailer.createTransport({
	host: services["Email"].config.host,
	port: services["Email"].config.port,
	secure: services["Email"].config.secure,
	auth: {
		user: services["Email"].config.username,
		pass: services["Email"].config.password
	}
});

async function send(destination, content) {
	await transport.sendMail({
		from: services["Email"].config.sender,
		to: destination,
		subject: services["Email"].config.subject,
		text: content,
		// TODO: html: "<b>Hello world?</b>"
	});
}

module.exports = { send };
