const request = require("supertest");
const express = require("express");

const app = new express();
app.use("/", require("./exampleEndpoints.js"));

describe("exampleEndpoints", () => {

	test("GET /my_cool_endpoint", async () => {
		const res = await request(app).get("/my_cool_endpoint");
		expect(res.statusCode).toEqual(200);
	});

	test("GET /another_endpoint", async () => {
		const res = await request(app).get("/another_endpoint");
		expect(res.statusCode).toEqual(200);
	});

});
