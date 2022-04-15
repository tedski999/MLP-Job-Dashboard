import React from "react";
import PropTypes from "prop-types";
import WithRouter from "../Components/WithRouter";
//import JobEntry from "../Components/JobEntry";
import api from "../api";

class Job extends React.Component {
	static propTypes = {
		params: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.params.id,
			job: {},
			statuses: [],
			loading: false
		};
	}

	async componentDidMount() {
		this.setState({ loading: true, statuses: await api.statuses() });
		const job = await api.job(this.state.id);
		this.setState({ loading: false, job: job });
	}

	render() {

		const job = this.state.job;

		if (job === {}) {
			const status = this.state.loading
				? <p>Loading job data...</p>
				: <p>Job not found!</p>;
			return (
				<div className="job-page">
					<br />
					<h1>Job: #{job.job_uid}</h1>
					{status}
				</div>
			);
		} else {

			const status = this.state.statuses[job.status_id];

			return (
				<div className="job-page">
					<br />
					<h1>Job: #{job.job_uid}</h1>
					<span>Number #{job.job_number}</span>
					<br />
					{status}
					{job.job_sub_status === null && <p className = "null-sub-status"> No Sub Status</p> || 
						<p>{job.job_sub_status}</p>}
					<div>
						<h2>Payload</h2>
						<div> { ("definition" in job) && <p>{job.definition}</p> || 
						<p className="empty-payload">Empty Payload</p> } </div>
					</div>
					{/*TODO: execution time, parent job, timeline */}
				</div>
			);
		}
	}
}

export default WithRouter(Job);
