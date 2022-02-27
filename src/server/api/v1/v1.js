const express = require("express");
const router = express.Router();

const exampleEndpoints = require("./exampleEndpoints.js");

router.use(exampleEndpoints);
router.use((req, res) => {
	res.sendStatus(404);
});

module.exports = router;
