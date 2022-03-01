const mysql = require("mysql");
const conn = mysql.createConnection({ user: "root", password: "dev" });

const jobStatusFile = process.argv[2] || "job_status.csv";
const autoQueueFile = process.argv[3] || "auto_queue.csv";

conn.connect()

// TODO(ted): dunno the names and types for the tables - ask ricardo
console.log(`Initialising development database with data from ${jobStatusFile} and ${autoQueueFile}...`)
conn.query("CREATE DATABASE dev");
conn.query("USE dev");
conn.query(`
	CREATE TABLE job_status (
		id INT NOT NULL,
		name VARCHAR(255) NOT NULL
	)`);
conn.query(`
	CREATE TABLE auto_queue (
		job_id VARCHAR(255),
		job_uid VARCHAR(255),
		job_number VARCHAR(255),
		job_ttl_seconds VARCHAR(255),
		job_sub_status VARCHAR(255),
		job_topic VARCHAR(255),
		status_id VARCHAR(255),
		created_by VARCHAR(255),
		created_on VARCHAR(255),
		updated_on VARCHAR(255),
		group_name VARCHAR(255),
		read_at VARCHAR(255),
		read_from_ip VARCHAR(255),
		read_by VARCHAR(255),
		acked_at VARCHAR(255),
		acked_from_ip VARCHAR(255),
		acked_by VARCHAR(255),
		completed_at VARCHAR(255),
		completed_from_ip VARCHAR(255),
		completed_by VARCHAR(255),
		parent_job_id VARCHAR(255),
		priority VARCHAR(255)
	)`);

conn.query(`
	LOAD DATA LOCAL INFILE "${jobStatusFile}"
		INTO TABLE job_status
		COLUMNS TERMINATED BY ','
		OPTIONALLY ENCLOSED BY '"'
		ESCAPED BY '"'
		LINES TERMINATED BY '\n';
	`, err => {
	if (err)
		throw err;
	console.log(`Successfully loaded data from ${jobStatusFile}`);
});
conn.query(`
	LOAD DATA LOCAL INFILE "${autoQueueFile}"
		INTO TABLE auto_queue
		COLUMNS TERMINATED BY ','
		OPTIONALLY ENCLOSED BY '"'
		ESCAPED BY '"'
		LINES TERMINATED BY '\n'
		IGNORE 1 LINES;
	`, err => {
	if (err)
		throw err;
	console.log(`Successfully loaded data from ${autoQueueFile}`);
});

conn.end();
