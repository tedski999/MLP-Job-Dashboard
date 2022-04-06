import React from "react";
import InfiniteList from "./InfiniteList";
import api from "../api";

class JobsList extends React.Component {
	constructor(props) {
		super(props);

		const now = new Date();
		const twoMonthsAgo = new Date(Date.now() - 1000*60*60*24*30*2);

		this.handleFormInput = this.handleFormInput.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.fetchJobs = this.fetchJobs.bind(this);

		this.state = {
			jobs: [],
			after: twoMonthsAgo.toISOString().substring(0, 10),
			before: now.toISOString().substring(0, 10),
			group: "",
			topic: ""
		};
	}

	handleFormInput(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	handleFormSubmit(e) {
		e.preventDefault();
		this.setState({ jobs: [] });
	}

	async fetchJobs() {
		const len = this.state.jobs.length;
		const seek = (len === 0) ? 0 : "" + this.state.jobs[len - 1].job_id;
		const newJobs = await api.jobs("",
			this.state.after, this.state.before,
			this.state.group, this.state.topic,
			"",
			100, seek);
		this.setState({ jobs: [...this.state.jobs, ...newJobs] });
	}

	renderJob(job) {
		return <p key={job.job_id}>{job.job_id}</p>;
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleFormSubmit}>
					<label> After: </label>
					<input name="after" type="date" value={this.state.after} onChange={this.handleFormInput} />
					<label> Before: </label>
					<input name="before" type="date" value={this.state.before} onChange={this.handleFormInput} />
					<label> Group: </label>
					<input name="group" type="text" value={this.state.group} onChange={this.handleFormInput} />
					<label> Topic: </label>
					<input name="topic" type="text" value={this.state.topic} onChange={this.handleFormInput} />
					<br />
					<input type="submit" value="Search" />
				</form>
				<InfiniteList
					data={this.state.jobs}
					fetchData={this.fetchJobs}
					loading={<p>Loading jobs...</p>}
					renderItem={this.renderJob}
				/>
			</div>
		);
	}
}

export default JobsList;