# MLP Job Anomaly Dashboard

![GitHub Build Workflow](https://github.com/tedski999/MLP-Job-Dashboard/actions/workflows/build.yml/badge.svg)

A web-based dashboard application for the monitoring and alerting of automation jobs anomalies.

Requirements: `node.js` and `npm`.

- Clone repository: `git clone git@github.com:tedski999/MLP-Job-Dashboard.git && cd MLP-Job-Dashboard`
- Install production dependencies: `npm install --production`
- Start production server: `npm run prod`
- Open `http://localhost:8080/` in browser

You can also deploy this project as a Docker container with `npm run docker`.

The development environment provides much better debugging support and automated rebuilding.
You should use this instead of the production server when developing.
- Install all dependencies: `npm install`
- Start development environment: `npm run dev`
- Open `http://localhost:8080/` in your browser.

If you're using the development environment, you'll probably want to set up the development database as well.
This will use `docker` to host a MariaDB database the project can query for test data.
- Start development database: `npm run dev_db`
- Initialise database with test data: `npm run dev_db:init <path to status_job.csv> <path to auto_queue.csv>`
