const fs = require("fs");
const path = require("path");
const mysql = require("mysql");

const jobStatusFile = process.argv[2] || "job_status.csv";
const autoQueueFile = process.argv[3] || "auto_queue.csv";
try { fs.statSync(jobStatusFile); } catch (err) { console.error("Unable to load job status data from", jobStatusFile); process.exit(1); }
try { fs.statSync(autoQueueFile); } catch (err) { console.error("Unable to load auto queue data from", autoQueueFile); process.exit(1); }
console.log("Job status file:", jobStatusFile);
console.log("Auto queue file:", autoQueueFile);

const script = `
CREATE DATABASE IF NOT EXISTS dev;
USE dev;

CREATE TABLE IF NOT EXISTS job_status (
	id INT PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS auto_queue (
	job_id INT PRIMARY KEY,
	job_uid VARCHAR(255),
	job_number VARCHAR(255),
	job_ttl_seconds INT,
	job_sub_status VARCHAR(255),
	job_topic VARCHAR(255),
	status_id INT,
	created_by VARCHAR(255),
	created_on DATETIME,
	updated_on DATETIME,
	group_name VARCHAR(255),
	read_at DATETIME,
	read_from_ip VARCHAR(255),
	read_by VARCHAR(255),
	acked_at DATETIME,
	acked_from_ip VARCHAR(255),
	acked_by VARCHAR(255),
	completed_at DATETIME,
	completed_from_ip VARCHAR(255),
	completed_by VARCHAR(255),
	parent_job_id INT,
	priority INT
);

LOAD DATA LOCAL INFILE '${jobStatusFile}'
	INTO TABLE job_status
	COLUMNS TERMINATED BY ','
	OPTIONALLY ENCLOSED BY '"'
	ESCAPED BY '"'
	LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE '${autoQueueFile}'
	INTO TABLE auto_queue
	COLUMNS TERMINATED BY ','
	OPTIONALLY ENCLOSED BY '"'
	ESCAPED BY '"'
	LINES TERMINATED BY '\n'
	IGNORE 1 LINES;
`;

const conn = mysql.createConnection({
	user: "root",
	password: "dev",
	multipleStatements: true,
	permitLocalInfile: "true"
});

console.log("Initialising database...");
conn.query(script, err => {
	if (err) {
		console.error("Unable to initialise:", err.message);
		process.exitCode = 1;
	} else {
		console.log("Done.");
	}
});
conn.end();