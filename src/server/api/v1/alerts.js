const express = require("express");
const router = express.Router();
const db = require("../../db.js");

router.use(express.json());

router.get("/alerts", async (req, res) => {
	const topic = req.query.t || "";
	const group = req.query.g || "";
	const service = req.query.s || "";
	const destination = req.query.d || "";
	let query = `
	SELECT * FROM alert_settings
	WHERE job_topic IS NOT NULL
		${topic !== "" ? `AND job_topic = ${topic}` : ""}
		${group !== "" ? `AND group_name = ${group}` : ""}
		${service !== "" ? `AND service = ${service}` : ""}
		${destination !== "" ? `AND destination = ${destination}` : ""}
	`;
	res.json(await db.query(query));
});

router.post("/alerts", async (req, res) => {
	const data = req.body;
	let query = `
	INSERT IGNORE INTO alert_settings VALUES(
		"${data.topic}", "${data.group}",
		"${data.service}", "${data.destination}"
	)`;
	await db.query(query);
	res.json({});
});

router.delete("/alerts", async (req, res) => {
	const topic = req.query.t || "";
	const group = req.query.g || "";
	const service = req.query.s || "";
	const destination = req.query.d || "";
	let query = `
	DELETE FROM alert_settings
	WHERE job_topic IS NOT NULL
		${topic !== "" ? `AND job_topic = ${topic}` : ""}
		${group !== "" ? `AND group_name = ${group}` : ""}
		${service !== "" ? `AND service = ${service}` : ""}
		${destination !== "" ? `AND destination = ${destination}` : ""}
	`;
	res.json(await db.query(query));
});

module.exports = router;
