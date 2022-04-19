import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavigationBar from "./Components/NavigationBar";
//import Dashboard from "./Views/Dashboard";
import Jobs from "./Views/Jobs";
import Job from "./Views/Job";
import Topics from "./Views/Topics";
import Topic from "./Views/Topic";
import Groups from "./Views/Groups";
import Group from "./Views/Group";
import Settings from "./Views/Settings";
import NotFound from "./Views/NotFound";

import "./style.scss";

ReactDOM.render(
	<BrowserRouter>
		<NavigationBar />
		<Routes>
			{/*<Route path="/" element={<Dashboard />} />*/}
			{/*<Route path="/jobs" element={<Jobs />} />*/}
			<Route path="/" element={<Jobs />} />
			<Route path="/jobs/:id" element={<Job />} />
			<Route path="/topics" element={<Topics />} />
			<Route path="/topics/:name" element={<Topic />} />
			<Route path="/groups" element={<Groups />} />
			<Route path="/groups/:name" element={<Group />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);
