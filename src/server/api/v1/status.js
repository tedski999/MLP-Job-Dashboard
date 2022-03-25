const express = require("express");
const router = express.Router();
const db = require("../../db.js");

router.get("/status", async (req, res) => {
	const query = "SELECT * FROM job_status";
	res.json(await db.query(query));
});

module.exports = router;
