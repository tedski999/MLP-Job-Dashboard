import React from "react";
import { useParams } from "react-router-dom";

export default function Topic() {
	const { name } = useParams();
	return (
		<div className = "topic-page-container">
			<div className="topic-page-header">
				<h1>Topic:{name}</h1>
			</div>
			<div className = "topic-page-warning-section"> Warning
				<div>ADD WARNING</div>
			</div>
			<div className = "topic-page-recentJobs-section"> Recent Jobs
				<div> ADD RECENT JOBS </div>
			</div>
			<div className = "topic-page-history-section"> History
				<div>INSERT HISTORY</div>
			</div>
			{/* <p>Topic: {name}</p> */}

		</div>
	);
}
