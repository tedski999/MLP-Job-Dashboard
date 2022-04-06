const path = require("path");
const express = require("express");
const app = express();

const { port, root } = require("../../config.json");
const v1 = require("./api/v1/v1.js");
const client = require("./client.js");
const db = require("./db.js");

db.init();

app.use(express.static(path.join(__dirname, "..", "..", root)));
app.use("/v1", v1);
app.use("*", client);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
