import React from 'react';
//import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import Home from "./Home"
import Jobs from "./Jobs"

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/jobs" component={Jobs} />
			</Switch>
		</Router>
	);
}

export default App;
