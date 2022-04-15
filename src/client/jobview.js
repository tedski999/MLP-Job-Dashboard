import api from "api";

// Stream in filtered job data
async function loadJobs(statuses, filters, aggregation, onNewJobs) {
	const freqs = {};
	await api.jobs(filters, newJobs => {

		newJobs.forEach(job => {
			job.status = job.status_id in statuses
				? statuses[job.status_id]
				: "Unknown";

			if (job.status in freqs === false)
				freqs[job.status] = {};

			const date = new Date(job.created_on);
			const dt = Math.round(date / aggregation) * aggregation;
			const aggregatedDate = new Date(dt);
			freqs[job.status][aggregatedDate] = freqs[job.status][aggregatedDate] + 1 || 1;
		});

		onNewJobs(newJobs, freqs);
	});
}

export default { loadJobs };
