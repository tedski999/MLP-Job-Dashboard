import React from "react";
import InfiniteList from "./InfiniteList";
import api from "../../api";

class GroupsList extends React.Component {

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

	renderGroup(group) {

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
			<div className="groups-list-entry" key={group.name}>
				<div className="details">
					<p><a href={`/groups/${group.name}`}>{group.name}</a></p>
					<a className="count" href={`/groups/${group.name}`}>{group.jobcount} jobs, {Object.keys(group.topics).length} topics</a>
				</div>
				<div className="time">
					<a href={`/groups/${group.name}`}>Updated {timeSince(group.lastused)} ago</a>
				</div>
			</div>
		);
	}

	render() {

		const groups = {};
		this.state.jobs.forEach(job => {
			if (job.group_name in groups === false) {
				groups[job.group_name] = { name: job.group_name, jobcount: 0, topics: {}, lastused: new Date(0) };
			}
			groups[job.group_name].jobcount++;
			groups[job.group_name].topics[job.group_name] = true;
			const date = new Date(job.created_on);
			if (date.getTime() > groups[job.group_name].lastused.getTime()) {
				groups[job.group_name].lastused = date;
			}
		});

		const data = Object.values(groups);

		return (
			<InfiniteList
				data={data}
				fetchData={this.fetchJobs}
				loading={<p>Loading groups...</p>}
				renderItem={this.renderGroup}
			/>
		);
	}
}

export default GroupsList;

