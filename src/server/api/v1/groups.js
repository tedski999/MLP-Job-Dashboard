const express = require("express");
const router = express.Router();
const db = require("../../db.js");

const PAGE_LENGTH = 10;

router.get("/groups", async (req, res) => {
	const page = req.query.p || 0;
	const query = `
	SELECT DISTINCT group_name FROM auto_queue
	LIMIT ${page * PAGE_LENGTH}, ${PAGE_LENGTH}`;
	res.json(await db.query(query));
});

router.get("/groups/:name", async (req, res) => {
	const name = req.params.name;
	const page = req.query.p || 0;
	const query = `
	SELECT * FROM auto_queue
	WHERE group_name = '${name}'
	LIMIT ${page * PAGE_LENGTH}, ${PAGE_LENGTH}`;
	res.json(await db.query(query));
});

module.exports = router;
