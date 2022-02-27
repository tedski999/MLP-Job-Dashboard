const express = require("express");
const router = express.Router();

router.get("/my_cool_endpoint", (req, res) => {
	const data = { message: "my cool data" };
	res.json(data);
});

router.get("/another_endpoint", (req, res) => {
	const data = { message: "more data?!?", foo: "bar" };
	res.json(data);
});

module.exports = router;
