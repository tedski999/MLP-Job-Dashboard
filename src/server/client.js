const path = require("path");
const express = require("express");
const router = express.Router();

const { SITE_ROOT } = require("./config");
const index = path.join(SITE_ROOT, "index.html");

router.use((req, res) => {
	res.sendFile(index);
});

module.exports = router;
