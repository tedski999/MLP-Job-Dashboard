const mariadb = require("mariadb");

const pool = mariadb.createPool({
	host: "127.0.0.1", port: "3306",
	user: "root", password: "dev",
	database: "dev"
});

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

module.exports = { connect, query };
