# MLP Job Anomaly Dashboard

![GitHub Build Workflow](https://github.com/tedski999/MLP-Job-Dashboard/actions/workflows/build.yml/badge.svg)

A web-based dashboard application for the monitoring and alerting of automation jobs anomalies.

Requirements: `node.js` and `npm`.

- Clone repository: `git clone git@github.com:tedski999/MLP-Job-Dashboard.git && cd MLP-Job-Dashboard`
- Install dependencies: `npm install`
- Start production server: `npm run prod`
- Open `http://localhost:8080/` in browser

The development environment provides much better debugging support and automated rebuilding.
You should use this instead of the production server when developing.
- Start development environment: `npm run dev`
- Open `http://localhost:8080/` in your browser.
- Change (and save) either the client or server code.
- Refresh your browser to see the changes.

You can deploy this project as a Docker container with the provided scripts.
This additionally requires that you have `docker` installed and running.
- Build and run the Docker container with `npm run docker`.
- Open `http://localhost/` in your browser.
