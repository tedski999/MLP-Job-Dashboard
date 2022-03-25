const express = require("express");
const router = express.Router();
const db = require("../../db.js");
	
const PAGE_LENGTH = 100;

router.get("/jobs", async (req, res) => {
	const page = req.query.p || 0;
	const query = `
	SELECT * FROM auto_queue
	LIMIT ${page * PAGE_LENGTH}, ${PAGE_LENGTH}`;
	res.json(await db.query(query));
});

router.get("/jobs/:id", async (req, res) => {
	const id = req.params.id;
	const page = req.query.p || 0;
	const query = `
	SELECT * FROM auto_queue
	WHERE job_id = ${id}
	LIMIT ${page * PAGE_LENGTH}, ${PAGE_LENGTH}`;
	res.json(await db.query(query));
});

module.exports = router;
