# MLP Job Anomaly Dashboard

![GitHub Build Workflow](https://github.com/tedski999/MLP-Job-Dashboard/actions/workflows/build.yml/badge.svg)

A web-based dashboard application for the monitoring and alerting of automation jobs anomalies.

## Getting Started

### Starting The App

#### Using Docker

To start using Docker, run `docker run -p 8080:8080 --init ghcr.io/tedski999/mlp-job-dashboard`.
This will download our latest package release from GitHub and start the app within a Docker container.

The app should now be visible at http://localhost:8080 within your browser.

#### Manually with Node.js

Alternatively, you can clone the repositry and start it manually using Node.js and npm using the following steps:
- First clone: `git clone git@github.com:tedski999/MLP-Job-Dashboard.git && cd MLP-Job-Dashboard`
- Then install production dependencies: `npm install --production`
- Finally build and run the app: `npm run prod`

The app should now be visible at http://localhost:8080 within your browser.

### Contributing

#### Starting the Development Environment

The development environment provides much better debugging support, code testing and automated rebuilding.
You should use this instead of the production server when working on the app.
You will need to have installed Node.js and npm, then you can follow these steps:
- First clone: `git clone git@github.com:tedski999/MLP-Job-Dashboard.git && cd MLP-Job-Dashboard`
- Then install all dependencies: `npm install`
- Finally start development environment: `npm run dev`

After running all tests, the development app should now be visible at http://localhost:8080 within your browser.
If you make any changes to either the Node.js server or the React.js client, the app will automatically be rebuilt and restarted.

#### Using a Development Database

If you're using the development environment, you'll probably want to set up the development database as well.
This will use Docker to host a MariaDB database the app can query.
- Start a new development database: `docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=dev --name mlp-devdb mariadb`
- Once it's running, initialise it with data: `npm run initdb status_job.csv auto_queue.csv`

## Reference

Developed by students of [Trinity College Dublin](https://www.tcd.ie)\
Developed for internal use by [Millennium Management](https://www.mlp.com)

#### Contributors

Ted Johnson [@tedski999](https://github.com/tedski999)\
Creagh Duggan [@cduggan1](https://github.com/cduggan1)\
Jiss Joseph [@jissj9](https://github.com/jissj9)\
Aoife Khan [@aoife-K](https://github.com/aoife-K)\
Alanna Fusciardi Wallace [@AlannaFusciardiWallace](https://github.com/AlannaFusciardiWallace)

Licensed under [MIT](LICENSE)
