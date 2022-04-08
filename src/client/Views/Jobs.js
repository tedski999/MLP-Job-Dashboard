import React from "react";
import JobsList from "../Components/Lists/JobsList";
import JobsFilter from "../Components/JobFilterToolbar";

class Jobs extends React.Component {

	constructor(props) {
		super(props);
		const now = new Date();
		const threeMonthsAgo = new Date(now - 1000*60*60*24*30*3);
		this.updateFilter = this.updateFilter.bind(this);
		this.state = {
			after: threeMonthsAgo,
			before: now,
			group: "",
			topic: "",
			status: ""
		};
	}

	updateFilter(after, before, group, topic, status) {
		this.setState({ after, before, group, topic, status });
	}

	render() {
		const key = this.state.after+this.state.before+this.state.group+this.state.topic+this.state.status;
		return (
			<div className="jobs-main-page-container">
				<br />
				<h1>Automation Jobs</h1>
				<JobsFilter
					onChange={this.updateFilter}
					after={this.state.after}
					before={this.state.before}
					group={this.state.group}
					topic={this.state.topic}
					status={this.state.status}
				/>
				<JobsList
					key={key}
					after={new Date(this.state.after)}
					before={new Date(this.state.before)}
					group={this.state.group}
					topic={this.state.topic}
					status={this.state.status}
				/>
			</div>
		);
	}
}

export default Jobs;
