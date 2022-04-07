const path = require("path");
const db = require("./db.js");
const { services } = require("../../config.json");

async function sendViaAppropriateService(job, content) {
	const query = `
		SELECT service, destination FROM alert_settings
		WHERE topic = ${job.job_topic} AND group = ${job.group_name}`;
	const result = await db.query(query);
	const { serviceName, destination } = result[0];
	const src = path.join(__dirname, "..", "..", services[serviceName].src);
	const service = require(src);
	service.send(destination, content);
}

async function getServiceNames() {
	return services.keys();
}

async function setTopicGroupService(service, destination) {
	console.log(service, "-", destination);
	// TODO: insert (topic group service destination)
}

async function sendFailureReport(job) {
	sendViaAppropriateService(job, "foo bar baz");
}

async function sendAnomalyReport(job, execTime) {
	sendViaAppropriateService(job, `bing bang boom ${execTime}`);
}

module.exports = {
	getServiceNames, setTopicGroupService,
	sendFailureReport, sendAnomalyReport
};
