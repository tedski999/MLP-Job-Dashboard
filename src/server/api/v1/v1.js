const express = require("express");
const router = express.Router();

// TODO: a lot of these endpoints should be preprocessed
// TODO: prevent sql injections lol - types also need to be checked
// TODO: testing

router.use(require("./auto_queue"));
router.use(require("./job_status"));
router.use((req, res) => {
	res.sendStatus(404);
});

module.exports = router;
