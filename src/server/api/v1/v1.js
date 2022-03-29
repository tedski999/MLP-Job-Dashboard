const express = require("express");
const router = express.Router();

// TODO: a lot of these endpoints should be preprocessed
// TODO: prevent sql injections lol - types also need to be checked
// TODO: move PAGE_LENGTHs to a config file
// TODO: testing

router.use(require("./exampleEndpoints.js"));
router.use(require("./jobs.js"));
router.use(require("./groups.js"));
router.use(require("./topics.js"));
router.use(require("./status.js"));
router.use((req, res) => {
	res.sendStatus(404);
});

module.exports = router;
