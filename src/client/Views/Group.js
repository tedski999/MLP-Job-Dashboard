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
			<div className = "group-page-warning-section"> 
				<h3>Warning</h3>
				<div>ADD WARNING</div>
			</div>
			<div className = "group-page-recentJobs-section"> 
				<h3>Recent Jobs</h3>
				<div> ADD RECENT JOBS </div>
			</div>
			<div className = "group-page-history-section">
				<h3>History</h3>
				<div>INSERT HISTORY</div>
			</div>
		</div>
	);
}