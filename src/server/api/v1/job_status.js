const express = require("express");
const router = express.Router();
const db = require("../../db.js");

router.get("/statuses", async (req, res) => {
	const query = "SELECT * FROM job_status";
	res.json(await db.query(query));
});

router.get("/statuses/:id", async (req, res) => {
	const id = req.params.id;
	const query = `
	SELECT * FROM job_status
	WHERE id = ${id}`;
	res.json(await db.query(query));
});

module.exports = router;
