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

class Group extends React.Component {
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
			topics: {},
			executionTimes: {},
			statuses: [],
			loading: true,
			aggregation: 1000*60*60*24,
			filters: {
				columns: "job_id,job_uid,created_on,completed_at,status_id,job_topic",
				before: now,
				after: threeMonthsAgo,
				topic: ""
			}
		};

		this.load = this.load.bind(this);
	}

	async componentDidMount() {
		this.setState({ statuses: await api.statuses() });
		this.load(this.state.filters);
	}

	async load(filters) {
		this.setState({ filters: filters, jobs: [], freqs: {}, topics: {}, loading: true });

		const freqs = {};
		const min = Math.round(this.state.filters.after / this.state.aggregation) * this.state.aggregation;
		const max = Math.round(this.state.filters.before / this.state.aggregation) * this.state.aggregation;
		this.state.statuses.forEach(status => freqs[status] = {});
		for (let dt = max; dt >= min; dt -= this.state.aggregation) {
			const date = new Date(dt);
			this.state.statuses.forEach(status => freqs[status][date] = 0);
		}

		const topics = {};
		const executionTimes = {};

		await api.loadJobs(this.state.statuses, { ...filters, group: this.state.name }, newJobs => {
			newJobs.forEach(job => {
				const date = new Date(Math.round(new Date(job.created_on) / this.state.aggregation) * this.state.aggregation);

				if (job.status in freqs === false)
					freqs[job.status] = {};
				freqs[job.status][date] = freqs[job.status][date] + 1 || 1;

				topics[job.job_topic] = topics[job.job_topic] + 1 || 1;

				const execTime = (new Date(job.completed_at) - new Date(job.created_on)) / 1000;
				if (date in executionTimes === false)
					executionTimes[date] = [];
				executionTimes[date].push(execTime);
			});
			this.setState({
				jobs: [...this.state.jobs, ...newJobs],
				freqs: freqs,
				topics: topics,
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
			loading={<p>Loading group jobs...</p>}
		/>;

		let status = <p>Found {this.state.jobs.length} jobs belonging to group</p>;
		if (this.state.jobs.length === 0) {
			status = this.state.loading
				? <p>Searching for group metrics...</p>
				: <p>Group not found!</p>;
		}

		return (
			<div className="group-page">
				<br />
				<h1>Group: {this.props.params.name}</h1>
				{status}
				<br />
				{filters}

				<div className="graphs">
					<div className="graph">
						<h2>History</h2>
						{jobStatusesOverTime}
					</div>
					<div className = "graph">
						<h2>Execution Times</h2>
						<Chart type="boxPlot"
							series={[{ data: Object.entries(this.state.executionTimes).map(e => ({x: e[0], y: e[1]})) }]}
							options={{
								chart: { animations: { enabled: false } },
								tooltip: { x: { format: "dd MMM HH:mm" } },
								xaxis: { type: "datetime" },
								yaxis: { min: 0 }
							}}
						/>
					</div>
					<div className="graph">
						<h2>Status</h2>
						{jobStatusesPieChart}
					</div>
					<div className="graph">
						<h2>Topics</h2>
						<Chart
							type="pie"
							series={Object.values(this.state.topics)}
							options={{ labels: Object.keys(this.state.topics) }}
						/>
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

export default WithRouter(Group);
