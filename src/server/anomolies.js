const cron = require("node-cron");
const { anomalies } = require("../../config.json");

let job;

function start() {
	job = cron.schedule(anomalies.croninterval, function() {
		console.log("**updating the database**");
	});
}

function stop() {
	job.stop();
}

module.exports = { start, stop };

