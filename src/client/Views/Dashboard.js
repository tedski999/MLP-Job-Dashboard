import React from "react";
import JobsList from "../Components/JobsList";
import JobsGraph from "../Components/JobsGraph";

class Dashboard extends React.Component {
	render() {
		return (
			<div>
				<JobsGraph />
				<JobsList />
			</div>
		);
	}
}

export default Dashboard;
