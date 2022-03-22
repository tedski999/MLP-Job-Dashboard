const request = require("supertest");
const express = require("express");

const app = new express();
app.use("/", require("./v1.js"));

describe("API v1", () => {
	test("responds handles 404 requests", async () => {
		const res = await request(app).get("/not-a-real-endpoint");
		expect(res.statusCode).toEqual(404);
		expect(res.text).toEqual("Not Found");
	});
});
