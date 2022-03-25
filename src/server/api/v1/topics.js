const express = require("express");
const router = express.Router();
const db = require("../../db.js");

const PAGE_LENGTH = 10;

router.get("/topics", async (req, res) => {
	const page = req.query.p || 0;
	const query = `
	SELECT DISTINCT job_topic FROM auto_queue
	LIMIT ${page * PAGE_LENGTH}, ${PAGE_LENGTH}`;
	res.json(await db.query(query));
});

router.get("/topics/:name", async (req, res) => {
	const name = req.params.name;
	const page = req.query.p || 0;
	const query = `
	SELECT * FROM auto_queue
	WHERE job_topic = '${name}'
	LIMIT ${page * PAGE_LENGTH}, ${PAGE_LENGTH}`;
	res.json(await db.query(query));
});

module.exports = router;
