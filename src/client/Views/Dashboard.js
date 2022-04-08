import React from "react";
import JobsList from "../Components/Lists/JobsList";
import StatusOverTime from "../Components/Graphs/StatusOverTime";
import StatusPieChart from "../Components/Graphs/StatusPieChart";

class Dashboard extends React.Component {
	render() {
		//const now = new Date("2022-02-10");
		const now = new Date("2022-02-10");
		const oneWeekAgo = new Date(now - 1000*60*60*24*7);
		const oneMonthAgo = new Date(now - 1000*60*60*24*30);
		return (
			<div className="dashboard-main-page-container">
				<br />
				<h1>Job Anomaly Dashboard</h1>
				<br />
				<div className="graphs">
					<div className="graph">
						<h2>Jobs Last Month</h2>
						<StatusOverTime after={oneMonthAgo} before={now} aggregation="hour" />
					</div>
					<div className="graph">
						<h2>Status Last Week</h2>
						<StatusPieChart after={oneWeekAgo} before={now} />
					</div>
				</div>
				<br />
				<h2>Recent Jobs</h2>
				<JobsList after={oneWeekAgo} before={now} />
			</div>
		);
	}
}

export default Dashboard;
