const db = require("./db");
const { scan } = require("../../config.json");

let scanExecutor;
let executionMetrics;

function getJobTopicGroupMetrics(job) {
	const metrics = executionMetrics;
	if (job.job_topic in metrics === false) {
		metrics[job.job_topic] = {};
	}
	if (job.group_name in metrics[job.job_topic] === false) {
		metrics[job.job_topic][job.group_name] = {
			count: 0, mean: 0, variance: 0
		};
	}
	return executionMetrics[job.job_topic][job.group_name];
}

function getJobExecutionTime(job) {
	if (job.status_id !== 3) { return 0; }
	const ms = new Date(job.completed_at) - new Date(job.created_on);
	return ms / 1000;
}

function recordJobMetrics(job) {
	if (job.status_id !== 3) { return; }
	const metrics = getJobTopicGroupMetrics(job);
	const { n, m, v } = metrics;
	const execTime = getJobExecutionTime(job);
	const newM = (m * n + execTime) / (n + 1);
	const newV = (v * n / (n + 1)) + (execTime - n) * (execTime - newM) / (n + 1);
	metrics.count = n + 1;
	metrics.mean = newM;
	metrics.variance = newV;
}

function isJobExectionTimeAnomalous(job) {
	const metrics = getJobTopicGroupMetrics(job);
	if (metrics.count < scan.anomaly.minJobs) { return false; }
	const execTime = getJobExecutionTime(job);
	const zscore = (execTime - metrics.mean) / Math.sqrt(metrics.variance);
	return (zscore >= scan.anomaly.threshold); // NOTE: Does not detect anomalously fast jobs
}

function handleNewJob(job) {
	if (job.status_id === 4 || job.status_id === 5) {
		// TODO: send failure alerts
	} else {
		recordJobMetrics(job);
		if (isJobExectionTimeAnomalous(job)) {
			// TODO: send anomaly alert
		}
	}
}

async function performScan() {
	console.log("Scanning recent jobs for failures and anomalies...");
	const query = `
		SELECT * FROM auto_queue
		WHERE created_on > DATE_SUB(
			NOW(), INTERVAL "${scan.interval}" SECOND
		)`;
	const conn = await db.connect();
	conn.queryStream(query)
		.on("data", handleNewJob)
		.on("end", () => { console.log("Done."); })
		.on("error", err => { console.error("Error while processing new automation jobs:", err); });
	conn.end();
}

async function start() {
	console.log("Pre-processing historic automation job metrics...");
	executionMetrics = {};
	const query = `
		SELECT status_id,job_topic,group_name,created_on,completed_at
		FROM auto_queue
		WHERE created_on > DATE_SUB(
			NOW(), INTERVAL "${scan.anomaly.history}" DAY
		)`;
	const conn = await db.connect();
	conn.queryStream(query)
		.on("data", recordJobMetrics)
		.on("end", () => {
			console.log("Done.");
			scanExecutor = setInterval(performScan, 1000 * scan.interval);
		})
		.on("error", err => {
			console.error("An error occurred while pre-processing historic automation job metrics:", err);
			process.exit(1);
		});
	conn.end();
}

function stop() {
	if (scanExecutor) {
		clearInterval(scanExecutor);
	}
}

module.exports = { start, stop };
