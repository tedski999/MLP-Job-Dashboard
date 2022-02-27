const express = require("express");
const app = express();

const { PORT, SITE_ROOT } = require("./config");
const v1 = require("./api/v1/v1.js");
const client = require("./client.js");

app.use(express.static(SITE_ROOT));
app.use("/v1", v1);
app.use("*", client);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
