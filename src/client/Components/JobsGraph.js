import React from "react";
import Chart from "react-apexcharts";
import api from "../api";

// Example graph presenting number of jobs created every hour over time.
// Uses the new streaming data feature to significantly increase performance over the network.
// In the context of this component, streaming is used to start rendering the data as it's
// still being downloaded.

class JobsGraph extends React.Component {

	constructor(props) {
		super(props);

		const now = new Date();
		//const aWeekAgo = new Date(Date.now() - 1000*60*60*24*7);
		const twoMonthsAgo = new Date(Date.now() - 1000*60*60*24*30*2);

		this.freqCounts = {};
		this.handleFormInput = this.handleFormInput.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);

		this.state = {
			loading: false,
			series: [],
			filters: {
				after: twoMonthsAgo.toISOString().substring(0, 10),
				before: now.toISOString().substring(0, 10),
				group: "",
				topic: "",
				status: ""
			},
			options: {
				chart: {
					id: "area-datetime",
					animations: { enabled: false }
				},
				tooltip: { x: { format: "dd MMM HH:mm" } },
				dataLabels: { enabled: false },
				xaxis: { type: "datetime", min: twoMonthsAgo.getTime(), max: now.getTime() },
				yaxis: { min: 0 }
			}
		};
	}

	componentDidMount() {
		this.generateGraph();
	}

	handleFormInput(e) {
		const {name, value} = e.target;
		this.setState(prev => ({
			filters: {
				...prev.filters,
				[name]: value
			}
		}));
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this.generateGraph();
	}

	async generateGraph() {
		this.setState({ loading: true });

		const after = new Date(this.state.filters.after);
		const before = new Date(this.state.filters.before);

		// Setup blank graph
		this.freqCounts = {};
		this.setState({ series: [{ name: "Jobs", data: [] }] });
		this.setState(prev => ({
			options: {
				...prev.options,
				xaxis: {
					...prev.options.xaxis,
					min: after.getTime(),
					max: before.getTime()
				}
			}
		}));
		for (const dt = new Date(after); dt <= before; dt.setHours(dt.getHours() + 1)) {
			this.freqCounts[dt] = 0;
		}

		// Count frequencies of jobs as they're streamed in
		await api.jobs("created_on", this.state.filters.after, this.state.filters.before, this.state.filters.group, this.state.filters.topic, this.state.filters.status, 0, jobs => {
			jobs.forEach(job => {
				const dt = new Date(job.created_on);
				dt.setMinutes(0, 0, 0);
				this.freqCounts[dt] = this.freqCounts[dt] + 1 || 1;
			});
			const data = Object.keys(this.freqCounts).map(dt => {
				return { x: dt, y: this.freqCounts[dt] };
			});
			this.setState({ series: [{ name: "Jobs", data: data }] });
		});

		this.setState({ loading: false });
	}

	render() {

		// Debug form for changing query values
		let form = (
			<form onSubmit={this.handleFormSubmit}>
				<label> After: </label>
				<input
					name="after" type="date"
					value={this.state.filters.after}
					onChange={this.handleFormInput}
				/>
				<label> Before: </label>
				<input
					name="before" type="date"
					value={this.state.filters.before}
					onChange={this.handleFormInput}
				/>
				<label> Group: </label>
				<input
					name="group" type="text"
					value={this.state.filters.group}
					onChange={this.handleFormInput}
				/>
				<label> Topic: </label>
				<input
					name="topic" type="text"
					value={this.state.filters.topic}
					onChange={this.handleFormInput}
				/>
				<label> Status: </label>
				<input
					name="status" type="text"
					value={this.state.filters.status}
					onChange={this.handleFormInput}
				/>
				<br />
				<input type="submit" value="Search" />
			</form>
		);

		let status = "";
		if (this.state.loading) {
			status = <p>Loading...</p>;
		}

		let graph = "";
		if (this.state.jobsLoaded !== 0) {
			graph = <Chart width={450} height={350} type="area" options={this.state.options} series={this.state.series} />;
		}

		return (
			<div>
				<br /><h3>Number of jobs created per hour over time</h3><br />
				{form}
				{status}
				{graph}
			</div>
		);
	}
}

export default JobsGraph;
