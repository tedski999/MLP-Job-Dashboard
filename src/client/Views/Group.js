import React from "react";
import { useParams } from "react-router-dom";
import JobsList from "../Components/Lists/JobsList";
import StatusOverTime from "../Components/Graphs/StatusOverTime";
import StatusPieChart from "../Components/Graphs/StatusPieChart";
import GroupTopicsPieChart from "../Components/Graphs/GroupTopicsPieChart";
import ExecutionTimeOverTime from "../Components/Graphs/ExecutionTimeOverTime";

export default function Group() {
	const { name } = useParams();
	//const now = new Date();
	const now = new Date("2022-02-10");
	const oneWeekAgo = new Date(now - 1000*60*60*24*7);
	const oneMonthAgo = new Date(now - 1000*60*60*24*30);
	return (
		<div className = "group-page-container">
			<div className="header">
				<h1>Group: {name}</h1>
			</div>
			<div className = "graphs">
				<div className = "graph">
					<h3>Jobs Last Month</h3>
					<StatusOverTime after={oneMonthAgo} before={now} group={name} aggregation="day" />
				</div>
				<div className = "graph">
					<h3>Execution Times Last Month</h3>
					<ExecutionTimeOverTime after={oneMonthAgo} before={now} group={name} aggregation="day" />
				</div>
				<div className="graph">
					<h2>Status Last Week</h2>
					<StatusPieChart after={oneWeekAgo} before={now} group={name} />
				</div>
				<div className="graph">
					<h2>Topics Last Week</h2>
					<GroupTopicsPieChart after={oneWeekAgo} before={now} group={name} />
				</div>
			</div>
			<div className = "recentJobs">
				<h3>Recent Jobs</h3>
				<JobsList after={oneMonthAgo} before={now} group={name}/>
			</div>
		</div>
	);
}
