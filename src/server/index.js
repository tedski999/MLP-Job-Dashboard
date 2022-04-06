const path = require("path");
const express = require("express");
const app = express();

const { port, root } = require("../../config.json");
const v1 = require("./api/v1/v1.js");
const client = require("./client.js");
const anomolies = require("./anomolies.js");
const db = require("./db.js");

db.init();
anomolies.start();

app.use(express.static(path.join(__dirname, "..", "..", root)));
app.use("/v1", v1);
app.use("*", client);

const server = app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

function shutdown() {
	console.log("Shutting down server...");
	anomolies.stop();
	db.stop();
	server.close(() => {
		process.exit(0);
	});
	setTimeout(() => {
		process.exit(0);
	}, 1000).unref();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
