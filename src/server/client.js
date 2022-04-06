const path = require("path");
const express = require("express");
const router = express.Router();

const { root } = require("./../../config");
const index = path.join(path.join(__dirname, "..", "..", root), "index.html");

router.use((req, res) => {
	res.sendFile(index);
});

module.exports = router;
