const path = require("path");
const db = require("./db.js");
const { services } = require("../../config.json");

async function sendViaAppropriateService(job, content) {
	const query = `
		SELECT service, destination FROM alert_settings
		WHERE job_topic = ${job.job_topic} AND group_name = ${job.group_name}`;
	const results = await db.query(query);
	results.forEach(({ serviceName, destination }) => {
		const src = path.join(__dirname, "..", "..", services[serviceName].src);
		const service = require(src);
		service.send(destination, content);
	});
}

async function getServiceNames() {
	return services.keys();
}

async function sendFailureReport(job) {
	sendViaAppropriateService(job, "foo bar baz");
}

async function sendAnomalyReport(job, execTime) {
	sendViaAppropriateService(job, `bing bang boom ${execTime}`);
}

module.exports = { getServiceNames, sendFailureReport, sendAnomalyReport };
