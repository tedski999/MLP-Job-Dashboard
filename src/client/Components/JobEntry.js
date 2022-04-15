import React from "react";
import PropTypes from "prop-types";
import JobIcon from "../Resources/job.png";
import SuccessIcon from "../Resources/success.png";
import FailureIcon from "../Resources/failure.png";
import InfoIcon from "../Resources/info.png";
import util from "../util";
import api from "../api";

class JobEntry extends React.Component {

	static propTypes = {
		job: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			job: this.props.job
		};
	}

	async componentDidMount() {
		this.setState({ loading: true });
		const job = await api.job(this.state.job.job_id);
		this.setState({ job: { ...this.state.job, ...job}, loading: false });
	}

	render() {
		const job = this.state.job;

		if (this.state.loading) {

			return (
				<div className="job-entry" style={{ background: "#eeeeee" }} key={job.job_id}>

					<a className="icon" href={`/jobs/${job.job_id}`}>
						<img className="job" src={JobIcon} />
					</a>

					<div className="details">
						<p className="upper"><a href={`/jobs/${job.job_id}`}>Job #{job.job_uid}</a></p>
						<p className="lower">Loading more details...</p>
					</div>

				</div>
			);

		} else {

			const lastUpdated = util.timeSince(Math.max(
				new Date(job.completed_at),
				new Date(job.updated_on),
				new Date(job.read_at),
				new Date(job.acked_at),
				new Date(job.created_on)
			));

			const background = ([
				"#cceecc", "#cceecc",
				"#eeeeee", "#eeeeee",
				"#eecccc", "#eecccc", "#eecccc", "#eecccc"
			])[job.status_id];

			const icon = ([
				InfoIcon, InfoIcon,
				SuccessIcon, SuccessIcon,
				FailureIcon, FailureIcon, FailureIcon, FailureIcon
			])[job.status_id];

			const uid = <a className="uid" href={`/jobs/${job.job_id}`}>#{job.job_uid}</a>;
			const topic = <a className="topic" href={`/topics/${job.job_topic}`}>{job.job_topic}</a>;
			const group = <a className="group" href={`/groups/${job.group_name}`}>{job.group_name}</a>;
			const number = <a className="number" href={`/jobs/${job.job_id}`}>Number #{job.job_number}</a>;

			return (
				<div className="job-entry" style={{ background: background }} key={job.job_id}>

					<a className="icon" href={`/jobs/${job.job_id}`}>
						<img className="job" src={JobIcon} />
						<img className="status" src={icon} />
					</a>

					<div className="details">
						<p className="upper">{topic} | {uid}</p>
						<p className="lower">{group}, {number}</p>
					</div>

					<div className="timestatus">
						<p className="time">Updated {lastUpdated} ago</p>
						<p className="status">{job.status}</p>
					</div>

				</div>
			);
		}
	}
}

export default JobEntry;
