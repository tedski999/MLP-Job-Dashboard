const path = require("path");

const PORT = process.env.PORT || 8080;
const SITE_ROOT = process.env.SITE_ROOT || path.join(__dirname, "../../dist");

module.exports = { PORT, SITE_ROOT };
