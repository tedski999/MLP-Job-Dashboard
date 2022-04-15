import React from "react";
import FreqOverTime from "../Components/Graphs/FreqOverTime";
import FreqPieChart from "../Components/Graphs/FreqPieChart";
import InfiniteList from "../Components/InfiniteList";
import JobFilters from "../Components/JobFilters";
import JobEntry from "../Components/JobEntry";
import api from "../api";

class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		const now = new Date();
		const threeMonthsAgo = new Date(now - 1000*60*60*24*30*3);
		this.state = {
			jobs: [],
			freqs: {},
			statuses: [],
			loading: false,
			aggregation: 1000*60*60*24,
			filters: {
				columns: "job_id,job_uid,created_on,status_id",
				before: now,
				after: threeMonthsAgo
			}
		};

		this.loadJobs = this.loadJobs.bind(this);
	}

	async componentDidMount() {
		this.setState({ statuses: await api.statuses() });
		this.loadJobs(this.state.filters);
	}

	async loadJobs(filters) {
		this.setState({ filters: filters, jobs: [], freqs: {}, loading: true });

		const freqs = {};
		const min = Math.round(this.state.filters.after / this.state.aggregation) * this.state.aggregation;
		const max = Math.round(this.state.filters.before / this.state.aggregation) * this.state.aggregation;
		this.state.statuses.forEach(status => freqs[status] = {});
		for (let dt = max; dt >= min; dt -= this.state.aggregation) {
			const date = new Date(dt);
			this.state.statuses.forEach(status => freqs[status][date] = 0);
		}

		await api.loadJobs(this.state.statuses, filters, newJobs => {
			newJobs.forEach(job => {
				if (job.status in freqs === false)
					freqs[job.status] = {};
				const date = new Date(Math.round(new Date(job.created_on) / this.state.aggregation) * this.state.aggregation);
				freqs[job.status][date] = freqs[job.status][date] + 1 || 1;
			});
			this.setState({ jobs: [...this.state.jobs, ...newJobs], freqs: freqs });
		});

		this.setState({ loading: false });
	}

	render() {
		const jobFilters = <JobFilters filters={this.state.filters} update={this.loadJobs} />;
		const jobStatusesOverTime = <FreqOverTime data={this.state.freqs} />;
		const jobStatusesPieChart = <FreqPieChart data={this.state.freqs} />;
		const jobList = <InfiniteList
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
			<div className="dashboard">
				<br />
				<h1>Job Anomaly Dashboard</h1>
				{status}
				<br />

				{jobFilters}
				{this.state.jobs.length !== 0 &&
					<div>
						<div className="graphs">
							<div className="graph">
								<h2>Jobs Last Month</h2>
								{jobStatusesOverTime}
							</div>
							<div className="graph">
								<h2>Status Last Month</h2>
								{jobStatusesPieChart}
							</div>
						</div>

						<br />
						<h2>Recent Jobs</h2>
						{jobList}
						<a href="/jobs">Browse all jobs</a>
					</div>
				}
			</div>
		);
	}
}

export default Dashboard;
