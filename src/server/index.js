const express = require("express");
const app = express();
const pool = require('./db');

const { PORT, SITE_ROOT } = require("./config");
const v1 = require("./api/v1/v1.js");
const client = require("./client.js");

const cron = require('node-cron');
const shell = require('shelljs');

app.use(express.static(SITE_ROOT));
app.use("/v1", v1);
app.use("*", client);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});


// Schedule tasks to be run on the server.
cron.schedule('* * * * *', function() {
	console.log('running a task every minute'); // Can be changed to suit
	//embed mariadb to update through csv file

	/*if (shell.exec('update database code goes here').code !== 0) {
		shell.exit(1);
	  }
	  else {
		shell.echo('Database update complete');
		console.log('Database update complete');
	  }
	  */

  });

//endpoint 1

  app.get('/jobid', async (req, res) => {
    let conn;
    try {
        // make a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query to fetch all records from the table
        var query = "select * from job_id";

        // we run the query and set the result to a new variable
        var rows = await conn.query(query);

        // return the results
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

app.get('/jobcreatedon', async (req, res) => {
    let conn;
    try {
        // make a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query to fetch all records from the table
        var query = "select * from created_on";

        // we run the query and set the result to a new variable
        var rows = await conn.query(query);

        // return the results
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});


