import React from "react";
import JobsList from "../Components/Lists/JobsList";
import JobsOverTime from "../Components/Graphs/JobsOverTime";
import StatusOverTime from "../Components/Graphs/StatusOverTime";

class Dashboard extends React.Component {
	render() {
		const now = new Date("2022-02-10");
		const oneMonthAgo = new Date(now - 1000*60*60*24*30);
		return (
			<div>
				<JobsOverTime after={oneMonthAgo} before={now} aggregation="hour" />
				<StatusOverTime after={oneMonthAgo} before={now} aggregation="day" />
				<JobsList />
			</div>
		);
	}
}

export default Dashboard;
