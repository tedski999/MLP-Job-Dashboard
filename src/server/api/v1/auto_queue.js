const express = require("express");
const router = express.Router();
const db = require("../../db.js");

// Query database and respond with result using the clients requested method (JSON or streaming)
async function executeQueryAndRespond(req, res, query) {
	const method = req.query.m || "json";
	if (method === "stream") {
		const conn = await db.connect();
		conn.queryStream(query)
			.on("error", err => { console.error("Issue streaming data:", err); })
			.on("data", row => { res.write(JSON.stringify(row) + "\n"); })
			.on("end", () => { res.end(); });
		conn.end();
	} else if (method === "json") {
		res.json(await db.query(query));
	}
}

// Find distinct values in a column
function getUniqueNames(column, req, res) {
	const limit = req.query.l || 0;
	const page = req.query.p || -1;
	const seek = req.query.s || "";
	let query = `
	SELECT DISTINCT ${column} FROM auto_queue
	${seek !== "" ? `WHERE job_id < "${seek}"` : ""}
	ORDER BY job_id DESC`;
	if (limit > 0) {
		query += (page >= 0)
			? `\nLIMIT ${page * limit}, ${limit}`
			: `\nLIMIT ${limit}`;
	}
	executeQueryAndRespond(req, res, query);
}

// Filterable list of jobs.
// See src/client/api.js for details
router.get("/jobs", (req, res) => {
	const columns = req.query.c || "*";
	const after = req.query.a || "1970-01-01";
	const before = req.query.b || new Date().toISOString().substring(0, 10);
	const group = req.query.g || "";
	const topic = req.query.t || "";
	const limit = req.query.l || 0;
	const page = req.query.p || -1;
	const seek = req.query.s || "";
	const status = req.query.r || "";
	let query = `
	SELECT ${columns} FROM auto_queue
	WHERE created_on BETWEEN "${after}" AND "${before}"
		${seek !== "" ? `AND job_id < "${seek}"` : ""}
		${topic !== "" ? `AND job_topic = "${topic}"` : ""}
		${group !== "" ? `AND group_name = "${group}"` : ""}
		${status !== "" ? `AND status_id IN (${status})` : ""}
	ORDER BY job_id DESC`;
	if (limit > 0) {
		query += (page >= 0)
			? `\nLIMIT ${page * limit}, ${limit}`
			: `\nLIMIT ${limit}`;
	}
	executeQueryAndRespond(req, res, query);
});

// Get information of a job by its job_id
router.get("/jobs/:id", (req, res) => {
	const id = req.params.id;
	const query = `
	SELECT * FROM auto_queue
	WHERE job_id = "${id}"`;
	executeQueryAndRespond(req, res, query);
});

// Get a list of distinct topics and groups used by jobs
router.get("/topics", (req, res) => { getUniqueNames("job_topic", req, res); });
router.get("/groups", (req, res) => { getUniqueNames("group_name", req, res); });

module.exports = router;
