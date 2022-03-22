const { WebClient } = require('@slack/web-api');

// Read a token from the environment variables
const token = "xoxb-3256211508503-3273193590836-aMfOodyHrD3dEifD5emwA3Pu";

const cron = require("node-cron");
// Initialize
const web = new WebClient(token);

// Given some known conversation ID (representing a public channel, private channel, DM or group DM)
const conversationId = 'C0385LMKT4K';

// Schedule tasks to be run on the server.
cron.schedule('* * * * * *', function() {
	console.log('running a task every minute');
	const result = web.chat.postMessage({
		text: 'test output!',
		channel: conversationId,
	  });
  });