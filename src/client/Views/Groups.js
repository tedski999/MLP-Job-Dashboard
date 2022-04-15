import React from "react";
import InfiniteList from "../Components/InfiniteList";
import GroupEntry from "../Components/GroupEntry";
import Filters from "../Components/Filters";
import api from "../api";

class Groups extends React.Component {

	constructor(props) {
		super(props);
		const now = new Date();
		const threeMonthsAgo = new Date(now - 1000*60*60*24*30*3);
		this.state = {
			groups: [],
			statuses: [],
			loading: false,
			filters: {
				attributes: "job_id,job_topic,group_name,created_on",
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
		this.setState({ filters: filters, groups: [], loading: true });

		const groups = {};
		await api.loadJobs(this.state.statuses, filters, newJobs => {
			newJobs.forEach(job => {
				if (job.group_name in groups === false) {
					groups[job.group_name] = {
						name: job.group_name,
						jobs: new Set(),
						topics: new Set(),
						updated: new Date(0)
					};
				}

				groups[job.group_name].jobs.add(job.job_id);
				groups[job.group_name].topics.add(job.job_topic);
				const date = new Date(job.created_on);
				if (groups[job.group_name].updated < date) {
					groups[job.group_name].updated = date;
				}

			});
			this.setState({ groups: Object.values(groups) });
		});

		this.setState({ loading: false });
	}

	render() {
		const filter = <Filters filters={this.state.filters} update={this.load} />;
		const list = <InfiniteList
			list={this.state.groups}
			render={group => <GroupEntry group={group} />}
			loading={<p>Loading groups...</p>}
		/>;

		let status = <p>Found {this.state.groups.length} groups</p>;
		if (this.state.groups.length === 0) {
			status = this.state.loading
				? <p>Searching for groups...</p>
				: <p>No groups found! Maybe try changing your filters?</p>;
		}

		return (
			<div className="groups-page">
				<br />
				<h1>Recent Job Groups</h1>
				{status}
				<br />
				{filter}
				{list}
			</div>
		);
	}
}

export default Groups;
