const process = require("process");
const path = require("path");
const child_process = require('child_process');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
	const development = (argv.mode != "production");

	let title = "Job Anomaly Dashboard";
	if (development)
		title = "[DEV] " + title;

	return {
		entry: "./src/client",
		stats: "minimal",
		devtool: development ? "inline-source-map" : undefined,
		output: {
			path: path.join(__dirname, "dist"),
			filename: "[name].[contenthash].js",
			publicPath: "/",
			clean: true
		},
		resolve: {
			modules: [
				"node_modules",
				path.join(__dirname, "src", "client")
			],
			alias: {
				react: path.join(__dirname, "node_modules", "react")
			}
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/i,
					include: path.join(__dirname, "src/client"),
					use: [ "babel-loader" ]
				},
				{
					test: /\.s[ac]ss$/i,
					include: path.join(__dirname, "src/client"),
					use: [ "style-loader", "css-loader", "sass-loader" ]
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					include: path.join(__dirname, "src/client"),
					type: "asset/resource"
				}

			]
		},
		plugins: [
			new HtmlWebPackPlugin({
				title: title,
				filename: "index.html",
				template: "./src/client/index.html",
			}),
			{
				apply: (compiler) => {
					compiler.hooks.watchRun.tap("RunClientLinter", () => {
						const child = child_process.spawn("npm", ["run", "lint:client"]);
						child.stdout.on("data", data => { process.stdout.write(data); });
						child.stderr.on("data", data => { process.stderr.write(data); });
					});
				}
			}
		]
	};
};
