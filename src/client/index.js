import React from "react";
import * as ReactDOM from "react-dom";
//import { render } from "react-dom";
// NOTE(ted):
// I haven't worked out decent SCSS scoping to React components yet,
// so all our styling is global like normal CSS
import "./style.scss";
//import { BrowserRouter } from "react-router-dom";
//import "./index.css";
//import App from "./App";

//import MyCoolComponent from "./MyCoolComponent/TestComponent";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import JobsList from "./Components/JobsList";
import LineGraph from "./Components/LineGraph";

const example_options = {xaxis: [0, 1, 2, 3, 4, 5, 6]};
const example_series = {name: "example", data: [2, 4, 9, 10, 1, 5, 7]};


ReactDOM.render(
	<Router>
		<Routes>
			<Route path="/" element={<Dashboard />}/>
			<Route path="/jobsList" element={<JobsList />}/>
			<Route path="/line" element={<LineGraph />}/>
		</Routes>
	</Router>,
	document.getElementById("root")
);