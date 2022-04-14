import React from "react";
import InfiniteList from "./InfiniteList";
import PropTypes from "prop-types";
import api from "../../api";

import CogsIcon from "./cogs.png";
import SuccessIcon from "./success.png";
import FailureIcon from "./failure.png";
import InfoIcon from "./info.png";

class JobsList extends React.Component {

	static propTypes = {
		after: PropTypes.instanceOf(Date),
		before: PropTypes.instanceOf(Date),
		group: PropTypes.string,
		topic: PropTypes.string,
		status: PropTypes.string
	};

	static defaultProps = {
		group: "",
		topic: "",
		status: ""
	};

	constructor(props) {
		super(props);
		this.fetchJobs = this.fetchJobs.bind(this);
		this.state = { jobs: [] };
	}

	async fetchJobs() {
		const len = this.state.jobs.length;
		const seek = (len === 0) ? 0 : "" + this.state.jobs[len - 1].job_id;
		const after = this.props.after !== undefined ? this.props.after.toISOString() : "";
		const before = this.props.before !== undefined ? this.props.before.toISOString() : "";
		const newJobs = await api.jobs("",
			after, before,
			this.props.group, this.props.topic,
			this.props.status,
			100, seek);
		this.setState({ jobs: [...this.state.jobs, ...newJobs] });
	}

	renderJob(job) {

		const timeSince = date => {
			let interval = new Date() - date;
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

		const times = [
			{ name: "Completed", time: new Date(job.completed_at) },
			{ name: "Updated", time: new Date(job.updated_at) },
			{ name: "Read", time: new Date(job.read_at) },
			{ name: "Acked", time: new Date(job.acked_at) },
			{ name: "Created", time: new Date(job.created_on) }
		];
		const mostRecent = times.reduce((prev, current) => prev.time > current.time ? prev : current);

		// TODO: get this from api.status(job.status_id) somehow?
		const colormap = [
			"#cceecc", "#cceecc",
			"#eeeeee", "#eeeeee",
			"#eecccc", "#eecccc", "#eecccc", "#eecccc"
		];
		const iconmap = [
			InfoIcon, InfoIcon,
			SuccessIcon, SuccessIcon,
			FailureIcon, FailureIcon, FailureIcon, FailureIcon
		];
		const statusmap = [
			"Created", "Read",
			"Acknowledged", "Successful",
			"Failed", "TimedOut", "Retried", "Cancelled"
		];
		const color = colormap[job.status_id];
		const icon = iconmap[job.status_id];
		const status = statusmap[job.status_id];

		return (
			<div style={{ background: color }} className="jobs-list-entry" key={job.job_id}>
				<a className="icon" href={`/jobs/${job.job_id}`}>
					<img className="job" src={CogsIcon} />
					<img className="status" src={icon} />
				</a>
				<div className="details">
					<p><a href={`/topics/${job.job_topic}`}>{/*job.job_number*/ job.job_topic}</a> | <a href={`/jobs/${job.job_id}`}><span className="topicgroup"> #{/*job.job_topic*/job.job_number}</span></a>, <a href={`/groups/${job.group_name}`}><span className="topicgroup">{job.group_name}</span></a></p>
					<a className="uid" href={`/jobs/${job.job_id}`}>#{job.job_uid}</a>
				</div>
				<div className="timestatus">
					<p className="time">{mostRecent.name} {timeSince(mostRecent.time)} ago</p>
					<p className="status">{status}</p>
				</div>
			</div>
		);
	}

	render() {
		return (
			<InfiniteList
				data={this.state.jobs}
				fetchData={this.fetchJobs}
				loading={<p className="job-filter-toolbar">Loading jobs...</p>}
				renderItem={this.renderJob}
			/>
		);
	}
}

export default JobsList;
