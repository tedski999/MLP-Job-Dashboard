const { WebClient } = require("@slack/web-api");
const { services } = require("../../config.json");

const web = new WebClient(services["Slack"].config.token);

async function send(destination, content) {
	await web.chat.postMessage({ text: content, channel: destination });
}

module.exports = { send };
