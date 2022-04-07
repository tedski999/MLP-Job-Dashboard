import React from "react";
import { useParams } from "react-router-dom";

export default function Group() {
	const { name } = useParams();
	return (
		<div className = "group-page-container">
			{/* <p>Group: {name}</p> */}
			<div className="group-page-header">
				<h1>Group:{name}</h1>
			</div>
			<div className = "group-page-warning-section"> Warning
				<div>ADD WARNING</div>
			</div>
			<div className = "group-page-recentJobs-section"> Recent Jobs
				<div> ADD RECENT JOBS </div>
			</div>
			<div className = "group-page-history-section"> History
				<div>INSERT HISTORY</div>
			</div>
		</div>
	);
}