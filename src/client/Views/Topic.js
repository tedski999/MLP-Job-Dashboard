import React from "react";
import { useParams } from "react-router-dom";

export default function Topic() {
	const { name } = useParams();
	return (
		<div className = "topic-page-container">
			<div className="topic-page-header">
				<h1>Topic:{name}</h1>
			</div>
			<div className = "topic-page-warning-section"> 
				<h3>Warning</h3>
				<div>ADD WARNING</div>
			</div>
			<div className = "topic-page-recentJobs-section"> 
				<h3>Recent Jobs</h3>
				<div> ADD RECENT JOBS </div>
			</div>
			<div className = "topic-page-history-section">
				<h3>History</h3> 
				<div>INSERT HISTORY</div>
			</div>
			{/* <p>Topic: {name}</p> */}

		</div>
	);
}
