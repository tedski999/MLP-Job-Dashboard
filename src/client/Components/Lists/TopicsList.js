import React from "react";
import InfiniteList from "./InfiniteList";
import api from "../../api";

class TopicsList extends React.Component {

	constructor(props) {
		super(props);
		this.fetchJobs = this.fetchJobs.bind(this);
		this.state = { jobs: [] };
	}

	async fetchJobs() {
		const len = this.state.jobs.length;
		const seek = (len === 0) ? 0 : "" + this.state.jobs[len - 1].job_id;
		const filters = { columns: "job_topic,group_name,created_on", limit: 1000 };
		const newJobs = await api.jobs(filters, seek);
		this.setState({ jobs: [...this.state.jobs, ...newJobs] });
	}

	renderTopic(topic) {

		const timeSince = date => {
			let interval = new Date("2022-02-11") - date;
			if (interval < 1000) { return Math.floor(interval) + "ms"; }
			interval /= 1000;
			if (interval < 60) { return Math.floor(interval) + "s"; }
			interval /= 60;
			if (interval < 60) { return Math.floor(interval) + "m"; }
			interval /= 60;
			if (interval < 24) { return Math.floor(interval) + "h"; }
			interval /= 24;
			if (interval < 30) { return Math.floor(interval) + "d"; }
			interval /= 30;
			if (interval < 12) { return Math.floor(interval) + "mo"; }
			interval /= 12;
			return Math.floor(interval) + "y";
		};

		return (
			<div className="topics-list-entry" key={topic.name}>
				<div className="details">
					<p><a href={`/topics/${topic.name}`}>{topic.name}</a></p>
					<a className="count" href={`/topics/${topic.name}`}>{topic.jobcount} jobs, {Object.keys(topic.groups).length} groups</a>
				</div>
				<div className="time">
					<a href={`/topics/${topic.name}`}>Updated {timeSince(topic.lastused)} ago</a>
				</div>
			</div>
		);
	}

	render() {

		const topics = {};
		this.state.jobs.forEach(job => {
			if (job.job_topic in topics === false) {
				topics[job.job_topic] = { name: job.job_topic, jobcount: 0, groups: {}, lastused: new Date(0) };
			}
			topics[job.job_topic].jobcount++;
			topics[job.job_topic].groups[job.group_name] = true;
			const date = new Date(job.created_on);
			if (date.getTime() > topics[job.job_topic].lastused.getTime()) {
				topics[job.job_topic].lastused = date;
			}
		});

		const data = Object.values(topics);

		return (
			<InfiniteList
				data={data}
				fetchData={this.fetchJobs}
				loading={<p>Loading topics...</p>}
				renderItem={this.renderTopic}
			/>
		);
	}
}

export default TopicsList;
