const { WebClient } = require("@slack/web-api");
const conf = require("./configuration.json");

const token = conf.slacktoken;

const cron = require("node-cron");
// Initialize
const web = new WebClient(token);

// Given some known conversation ID (representing a public channel, private channel, DM or group DM)
const conversationId = conf.convID;

// Schedule tasks to be run on the server.
cron.schedule("* * * * * *", function() {
	console.log("running a task every minute");
	const result = web.chat.postMessage({
		text: "test output!",
		channel: conversationId,
	});
	console.log(result);
});