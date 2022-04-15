import React from "react";
import InfiniteList from "../Components/InfiniteList";
import TopicEntry from "../Components/TopicEntry";
import Filters from "../Components/Filters";
import api from "../api";

class Topics extends React.Component {

	constructor(props) {
		super(props);
		const now = new Date();
		const threeMonthsAgo = new Date(now - 1000*60*60*24*30*3);
		this.state = {
			topics: [],
			statuses: [],
			loading: false,
			filters: {
				attributes: "job_topic,",
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
		this.setState({ filters: filters, topics: [], loading: true });

		const topics = {};
		await api.loadJobs(this.state.statuses, filters, newJobs => {
			newJobs.forEach(job => {
				if (job.job_topic in topics === false) {
					topics[job.job_topic ] = {
						name: job.job_topic,
						jobs: new Set(),
						groups: new Set(),
						updated: new Date(0)
					};
				}
				topics[job.job_topic].jobs.add(job.job_id);
				topics[job.job_topic].groups.add(job.group_name);
				const date = new Date(job.created_on);
				if (topics[job.job_topic].updated < date) {
					topics[job.job_topic].updated = date;
				}
			});
			this.setState({ topics: Object.values(topics) });
		});

		this.setState({ loading: false });
	}

	render() {
		const filter = <Filters filters={this.state.filters} update={this.load} />;
		const list = <InfiniteList
			list={this.state.topics}
			render={topic => <TopicEntry topic={topic} />}
			loading={<p>Loading topics...</p>}
		/>;

		let status = <p>Found {this.state.topics.length} topics</p>;
		if (this.state.topics.length === 0) {
			status = this.state.loading
				? <p>Searching for topics...</p>
				: <p>No topics found! Maybe try changing your filters?</p>;
		}

		return (
			<div className="topics-page">
				<br />
				<h1>Recent Job Topics</h1>
				{status}
				<br />
				{filter}
				{list}
			</div>
		);
	}
}

export default Topics;
