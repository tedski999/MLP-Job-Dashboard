const mariadb = require("mariadb");
const conf = require("./configuration.json");
let pool;

function init() {
	pool = mariadb.createPool({
		host: conf.db.host, port: conf.db.port,
		user: conf.user, password: conf.pass,
		database: conf.db
	});
}

function stop() {
	pool.end();
}

function connect() {
	return new Promise((resolve, reject) => {
		pool.getConnection().then(resolve).catch(reject);
	});
}

async function query(q) {
	try {
		const conn = await connect();
		const result = await conn.query(q);
		conn.end();
		return result;
	} catch (err) {
		console.error("Unable to query database:");
		console.error(err.message);
		return { error: err.message };
	}
}

module.exports = { init, stop, connect, query };
