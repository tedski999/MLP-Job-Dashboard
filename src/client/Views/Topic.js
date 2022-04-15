import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import WithRouter from "../Components/WithRouter";
import FreqOverTime from "../Components/Graphs/FreqOverTime";
import FreqPieChart from "../Components/Graphs/FreqPieChart";
import InfiniteList from "../Components/InfiniteList";
import JobEntry from "../Components/JobEntry";
import Filters from "../Components/Filters";
import api from "../api";

class Topic extends React.Component {
	static propTypes = {
		params: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		const now = new Date();
		const threeMonthsAgo = new Date(now - 1000*60*60*24*30*3);
		this.state = {
			name: this.props.params.name,
			jobs: [],
			freqs: {},
			groups: {},
			executionTimes: {},
			statuses: [],
			loading: false,
			aggregation: 1000*60*60*24,
			filters: {
				columns: "job_id,job_uid,created_on,completed_at,status_id,group_name",
				before: now,
				after: threeMonthsAgo
			}
		};

		this.load = this.load.bind(this);
	}

	async componentDidMount() {
		this.setState({ statuses: await api.statuses() });
		this.load(this.state.filters);
	}

	async load(filters) {
		this.setState({ filters: filters, jobs: [], freqs: {}, groups: {}, loading: true });

		const freqs = {};
		const min = Math.round(this.state.filters.after / this.state.aggregation) * this.state.aggregation;
		const max = Math.round(this.state.filters.before / this.state.aggregation) * this.state.aggregation;
		this.state.statuses.forEach(status => freqs[status] = {});
		for (let dt = max; dt >= min; dt -= this.state.aggregation) {
			const date = new Date(dt);
			this.state.statuses.forEach(status => freqs[status][date] = 0);
		}

		const groups = {};
		const executionTimes = {};

		await api.loadJobs(this.state.statuses, { ...filters, topic: this.state.name }, newJobs => {
			newJobs.forEach(job => {
				const date = new Date(Math.round(new Date(job.created_on) / this.state.aggregation) * this.state.aggregation);

				if (job.status in freqs === false)
					freqs[job.status] = {};
				freqs[job.status][date] = freqs[job.status][date] + 1 || 1;

				groups[job.group_name] = groups[job.group_name] + 1 || 1;

				const execTime = (new Date(job.completed_at) - new Date(job.created_on)) / 1000;
				if (date in executionTimes === false)
					executionTimes[date] = [];
				executionTimes[date].push(execTime);
			});
			this.setState({
				jobs: [...this.state.jobs, ...newJobs],
				freqs: freqs,
				groups: groups,
				executionTimes: executionTimes
			});
		});

		this.setState({ loading: false });
	}

	render() {
		const filters = <Filters filters={this.state.filters} update={this.load} />;
		const jobStatusesOverTime = <FreqOverTime data={this.state.freqs} />;
		const jobStatusesPieChart = <FreqPieChart data={this.state.freqs} />;
		const jobList = <InfiniteList
			list={this.state.jobs}
			render={job => <JobEntry job={job} />}
			loading={<p>Loading topic jobs...</p>}
		/>;

		let series, options;

		// Box plot
		// TODO
		const executionTimeOverTime = <p></p>;

		// Pie chart
		series = Object.values(this.state.groups);
		options = {
			labels: Object.keys(this.state.groups)
		};
		const groupsPieChart = <Chart type="pie" series={series} options={options} />;

		let status = <p>Found {this.state.jobs.length} jobs belonging to topic</p>;
		if (this.state.jobs.length === 0) {
			status = this.state.loading
				? <p>Searching for topic metrics...</p>
				: <p>Topic not found!</p>;
		}

		return (
			<div className="topic-page">
				<br />
				<h1>Topic: {this.props.params.name}</h1>
				{status}
				<br />
				{filters}

				<div className = "graphs">
					<div className = "graph">
						<h3>History</h3>
						{jobStatusesOverTime}
					</div>
					<div className = "graph">
						<h3>Execution Times</h3>
						{executionTimeOverTime}
					</div>
					<div className="graph">
						<h2>Status</h2>
						{jobStatusesPieChart}
					</div>
					<div className="graph">
						<h2>Groups</h2>
						{groupsPieChart}
					</div>
				</div>
				<div className = "recentJobs">
					<h2>Recent Jobs</h2>
					{jobList}
				</div>
			</div>
		);

	}
}

export default WithRouter(Topic);
