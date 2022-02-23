const path = require("path");
const express = require("express");
const app = express();

// Configure the server (or just use the defaults if they aren't set)
const PORT = process.env.PORT || 8080;
const SITE_ROOT = process.env.SITE_ROOT || path.join(__dirname, "../../dist");

// Serve any static files that match the requested URL
app.use(express.static(SITE_ROOT));

// Otherwise, if the requested URL matches, serve the REST API endpoints
app.get("/v1/my_cool_endpoint", (req, res) => {
	const data = {
		message: "my cool data"
	};

	res.json(data);
});
app.get("/v1/another_endpoint", (req, res) => {
	const data = {
		message: "more data?!?",
		foo: "bar"
	};

	res.json(data);
});
app.get("/v1/*", (req, res) => {
	res.sendStatus(404);
});

// Otherwise, no matter what the requested URL is, serve our React file - The React router will handle it!
app.get("*", (req, res) => {
	const index = path.join(SITE_ROOT, "index.html");
	res.sendFile(index);
});

// Alright, let's start this server!
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
