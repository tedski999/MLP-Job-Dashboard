
// Receive the entire requested data in one go.
async function fetchJSON(url) {
	try {
		const response = await fetch(url + "&m=json");
		return await response.json();
	} catch (err) {
		alert("Error:", err);
		return [];
	}
}

// Stream the requested data from the API, executing the provided callback with
// the latests array of new data objects received. Useful for long operations
// where you want to keep the client page updated as data comes in.
async function fetchStream(url, callback) {
	const items = [];
	const response = await fetch(url + "&m=stream");
	const reader = await response.body.getReader();

	let carry = "", done, value;
	while (!done) {
		({ value, done } = await reader.read());
		if (done) break;

		// Decode the latest chunk of data. The first
		// line needs the previous chunks last line prepended
		// to it because the chunks don't necessarily split
		// on line endings!
		const newItems = [];
		const text = new TextDecoder().decode(value);
		text.split("\n").forEach((line, idx, lines) => {
			if (Object.is(0, idx)) {
				newItems.push(JSON.parse(carry + line));
			} else if (Object.is(lines.length - 1, idx)) {
				carry = line;
			} else {
				newItems.push(JSON.parse(line));
			}
		});

		callback(newItems);
		items.push(...newItems);
	}

	return items;
}

// Get all the details about a job with a specific job_id
async function job(id) {
	const $job = await fetchJSON("/v1/jobs/" + id);
	return $job[0];
}

// Get a filtered list of jobs, sorted in decending job_id order.
// Use columns to specify whuch attributes you want (e.g. "job_id,created_on" or "" for all)
// Specify a date range with after and before (e.g after 2020-10-18 and before 2021-4-2)
// Search for jobs with groups or topics containing some string (e.g. "47" matchs with "Group-47")
// Use limit to limit how many jobs will be recieve (e.g. 10 will only get the first 10 matching jobs)
// pagingMethod is used to specify how to search for and recieve the requested data:
// - Passing in a function implies that the data should be streamed. See fetchStream for more info.
// - A string is used to skip straight to a matching job_id and any later data. This is much faster than paging.
// - Finally, a number is simply used as a paging index. The data will start from index of (limit * page).
async function jobs(filters, pagingMethod) {
	let url = "/v1/jobs?";
	if ("columns" in filters) url += "&c=" + filters.columns;
	if ("after"   in filters) url += "&a=" + filters.after.toISOString().substring(0, 10);
	if ("before"  in filters) url += "&b=" + filters.before.toISOString().substring(0, 10);
	if ("topic"   in filters) url += "&t=" + filters.topic;
	if ("group"   in filters) url += "&g=" + filters.group;
	if ("status"  in filters) url += "&r=" + filters.status;
	if ("limit"   in filters) url += "&l=" + filters.limit;
	switch (typeof pagingMethod) {
	case "function": return await fetchStream(url, pagingMethod);
	case "string": return await fetchJSON(url + "&s=" + pagingMethod);
	case "number": return await fetchJSON(url + "&p=" + pagingMethod);
	default: return await fetchJSON(url + "&p=" + 0);
	}
}

// Get a list of distinct group names used by jobs
async function groups(limit, pagingMethod) {
	const url = `/v1/groups?l=${limit}`;
	if (typeof pagingMethod !== typeof Function) {
		return await fetchJSON(url + "&p=" + pagingMethod);
	} else {
		return await fetchStream(url, pagingMethod);
	}
}

// Get a list of distinct topic names used by jobs
async function topics(limit, pagingMethod) {
	const url = `/v1/topics?l=${limit}`;
	if (typeof pagingMethod !== typeof Function) {
		return await fetchJSON(url + "&p=" + pagingMethod);
	} else {
		return await fetchStream(url, pagingMethod);
	}
}

// Get the full map between the IDs and names of job statuses
async function statuses() {
	const statuses = await fetchJSON("/v1/statuses?");
	statuses.sort((a, b) => a.id - b.id);
	return statuses.map(s => s.name);
}

// Get the corresponding name for a job status ID
async function status(id) {
	return await fetchJSON("/v1/statuses/" + id)[0];
}

// Get a filterable list of alert destination settings
async function alerts(topic, group, service, destination) {
	return await fetchJSON(`/v1/alerts?t=${topic}&g=${group}&s=${service}&d=${destination}`);
}

// Set the service and destination of an alert
async function setAlert(topic, group, service, destination) {
	try {
		const response = await fetch("/v1/alerts", {
			method: "POST",
			body: JSON.stringify({ topic, group, service, destination }),
			headers: { "Content-Type": "application/json" }
		});
		return await response.json();
	} catch (err) {
		alert("Error:", err);
		return [];
	}
}

// Delete alert destination settings
async function deleteAlerts(topic, group, service, destination) {
	return await fetchJSON(`/v1/alerts?t=${topic}&g=${group}&s=${service}&d=${destination}`, {
		method: "DELETE"
	});
}

// Easy function to stream in filtered job data
async function loadJobs(statuses, filters, onNewJobs) {
	await jobs(filters, newJobs => {
		newJobs.forEach(job => {
			job.status = job.status_id in statuses
				? statuses[job.status_id]
				: "Unknown";
		});
		onNewJobs(newJobs);
	});
}

export default {
	job, jobs,
	groups, topics,
	status, statuses,
	alerts, setAlert, deleteAlerts,
	loadJobs
};
