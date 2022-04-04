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
import JobsGraph from "./Components/JobsGraph";
import NavigationBar from "./Components/NavigationBar";

ReactDOM.render(
	<Router>
		<NavigationBar />
		<Routes>
			<Route path="/" element={<Dashboard />}/>
			<Route path="/jobsList" element={<JobsList />}/>
			<Route path="/line" element={<JobsGraph />}/>
		</Routes>
	</Router>,
	document.getElementById("root")
);
