const express = require("express");
const app = express();

const { PORT, SITE_ROOT } = require("./config");
const v1 = require("./api/v1/v1.js");
const client = require("./client.js");

const { App } = require("@slack/bolt");

app.use(express.static(SITE_ROOT));
app.use("/v1", v1);
app.use("*", client);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});


const slackapp = new App({
	token: "xoxb-3256211508503-3273193590836-aMfOodyHrD3dEifD5emwA3Pu",
	signingSecret: "9665baa96a9d9c740ceedb3c38f6d007",
	socketMode: true, 
	appToken: "xapp-1-A037S5DNLCE-3270992782418-8c60279755c6236fb3d9ae9b214bf088179dfdf3d66fd28feffb7ee1a8bf5bbe"
});



(async () => {
	// Start your app
	await slackapp.start();
	console.log("⚡️ Bolt app is running!");
	await say("Hello");
})();

