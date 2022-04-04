import React from "react";
import api from "../api";

// Example list presenting an infinitely-scrolling jobs list.
// Uses the new seeking feature to significantly increase performance after initial search.
// Instead of offsetting our next request by a page number, we remember the last jobs ID and
// use that to quickly skip to the next lot of jobs to be downloaded.

class JobsList extends React.Component {

	constructor(props) {
		super(props);

		const now = new Date();
		//const aWeekAgo = new Date(Date.now() - 1000*60*60*24*7);
		const twoMonthsAgo = new Date(Date.now() - 1000*60*60*24*30*2);

		this.lastJobID = 0;
		this.handleFormInput = this.handleFormInput.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);

		this.state = {
			loading: false,
			jobs: [],
			filters: {
				after: twoMonthsAgo.toISOString().substring(0, 10),
				before: now.toISOString().substring(0, 10),
				group: "",
				topic: ""
			},
		};
	}

	// Add an observer to load more jobs whenever the loading element is on-screen
	componentDidMount() {
		const options = { root: null, rootMargin: "0px", threshold: 1.0 };
		this.observer = new IntersectionObserver(targets => {
			if (targets[0].isIntersecting && !this.state.loading) {
				this.loadNextPage();
			}
		}, options);
		this.observer.observe(this.loadingRef);
	}

	// Clean up the observer
	componentWillUnmount() {
		this.observer.disconnect();
	}

	// Update teh debug form query values when they're changed by the user
	handleFormInput(e) {
		const {name, value} = e.target;
		this.setState(prev => ({
			filters: {
				...prev.filters,
				[name]: value
			}
		}));
	}

	// Reset and search again after the debug form queries are submitted
	handleFormSubmit(e) {
		e.preventDefault();
		this.lastJobID = 0;
		this.setState({ jobs: [] });
		this.loadNextPage();
	}

	// Fetch the next page of jobs and append it to the list
	async loadNextPage() {
		this.setState({ loading: true });

		const newJobs = await api.jobs(
			"",
			this.state.filters.after,
			this.state.filters.before,
			this.state.filters.group,
			this.state.filters.topic,
			100, this.lastJobID);

		this.setState({ jobs: [...this.state.jobs, ...newJobs] });
		if (newJobs.length > 0) {
			this.lastJobID = "" + newJobs[newJobs.length - 1].job_id;
		}

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
				<br />
				<input type="submit" value="Search" />
			</form>
		);

		// The list of fetched jobs
		const list = this.state.jobs.map(job => (
			<p key={job.job_id}>Job #{job.job_id} | Group = {job.group_name}, Topic = {job.job_topic}</p>
		));

		// The loading text which triggers the infinite-scroll observer
		const loading = (
			<div ref={loadingRef => (this.loadingRef = loadingRef)}>
				{ this.state.loading && <p>Loading...</p> }
			</div>
		);

		return (
			<div>
				{form}
				{list}
				{loading}
			</div>
		);
	}
}

export default JobsList;
