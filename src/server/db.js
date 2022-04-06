const mariadb = require("mariadb");
const { db } = require("../../config.json");

let pool;

function init() {
	pool = mariadb.createPool({
		host: db.host, port: db.port,
		user: db.user, password: db.pass,
		database: db.db
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
