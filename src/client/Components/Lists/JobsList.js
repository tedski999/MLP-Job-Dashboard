import React from "react";
import InfiniteList from "./InfiniteList";
import PropTypes from "prop-types";
import api from "../../api";

class JobsList extends React.Component {

	static propTypes = {
		after: PropTypes.instanceOf(Date),
		before: PropTypes.instanceOf(Date),
		group: PropTypes.string,
		topic: PropTypes.string,
		status: PropTypes.string
	};

	static defaultProps = {
		group: "",
		topic: "",
		status: ""
	};

	constructor(props) {
		super(props);
		this.fetchJobs = this.fetchJobs.bind(this);
		this.state = { jobs: [] };
	}

	async fetchJobs() {
		const len = this.state.jobs.length;
		const seek = (len === 0) ? 0 : "" + this.state.jobs[len - 1].job_id;
		const newJobs = await api.jobs("",
			this.props.after.toISOString(), this.props.before.toISOString(),
			this.props.group, this.props.topic,
			this.props.status,
			100, seek);
		this.setState({ jobs: [...this.state.jobs, ...newJobs] });
	}

	renderJob(job) {
		return <p key={job.job_id}>{job.job_id}</p>;
	}

	render() {
		return (
			<InfiniteList
				data={this.state.jobs}
				fetchData={this.fetchJobs}
				loading={<p>Loading jobs...</p>}
				renderItem={this.renderJob}
			/>
		);
	}
}

export default JobsList;
