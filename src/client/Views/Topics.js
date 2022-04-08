import React from "react";
import TopicsList from "../Components/Lists/TopicsList";

class Topics extends React.Component {
	render() {
		return (
			<div className="topics-main-page-container">
				<br />
				<h1>Topics</h1>
				<TopicsList />
			</div>
		);
	}
}

export default Topics;
