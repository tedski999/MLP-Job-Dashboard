import React from "react";
import InfiniteList from "../Components/InfiniteList";
import JobEntry from "../Components/JobEntry";
import Filters from "../Components/Filters";
import api from "../api";

class Jobs extends React.Component {

	constructor(props) {
		super(props);
		const now = new Date();
		const threeMonthsAgo = new Date(now - 1000*60*60*24*30*3);
		this.state = {
			jobs: [],
			statuses: [],
			loading: true,
			filters: {
				attributes: "job_id,job_uid,status_id",
				before: now,
				after: threeMonthsAgo,
				topic: "",
				group: "",
			}
		};

		this.load = this.load.bind(this);
	}

	async componentDidMount() {
		this.setState({ statuses: await api.statuses() });
		this.load(this.state.filters);
	}

	async load(filters) {
		this.setState({ filters: filters, jobs: [], loading: true });
		await api.loadJobs(this.state.statuses, filters, newJobs => {
			this.setState({ jobs: [...this.state.jobs, ...newJobs] });
		});
		this.setState({ loading: false });
	}

	render() {
		const filters = <Filters filters={this.state.filters} update={this.load} />;
		const list = <InfiniteList
			list={this.state.jobs}
			render={job => <JobEntry job={job} />}
			loading={<p>Loading jobs...</p>}
		/>;

		let status = <p>Found {this.state.jobs.length} jobs</p>;
		if (this.state.jobs.length === 0) {
			status = this.state.loading
				? <p>Searching for job metrics...</p>
				: <p>No jobs found! Maybe try changing your filters?</p>;
		}

		return (
			<div className="jobs-page">
				<br />
				<h1>Recent Automation Jobs</h1>
				{status}
				<br />
				{filters}
				{list}
			</div>
		);
	}
}

export default Jobs;
