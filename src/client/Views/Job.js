import React from "react";
// import { useParams } from "react-router-dom";
import api from "../api";
import WithRouter from "../Components/WithRouter";
import NotFound from "./NotFound";
import PropTypes from "prop-types";
import SuccessIcon from "../Components/Lists/success.png";
import FailureIcon from "../Components/Lists/failure.png";
// export default async function Job() {
// 	const { id } = useParams();
// 	// const jobData = await api.jobs(id);
// 	return (
// 		<div>
// 			<p>Job: {id}</p>
// 		</div>
// 	);
// }

class Job extends React.Component {
	static propTypes = {
		params: PropTypes.object.isRequired,
	};

	constructor(props){
		super(props);
		this.fetchJob = this.fetchJob.bind(this);
		// const { id } = useParams();
		this.state = {
			jobData: null
		};
		this.fetchJob();
	}
	async fetchJob() {
		const jobData = await api.job(this.props.params.id);
		// const jobData = await api.job(this.state.id);
		// console.log(JSON.stringify(jobData));
		this.setState({ jobData: jobData });
	}

	render() {
		if(this.state.jobData === null){
			return <div>Loading...</div>;
		}
		const statusmap = [
			"Created", "Read",
			"Acknowledged", "Successful",
			"Failed", "TimedOut", "Retried", "Cancelled"
		];
		const status = statusmap[this.state.jobData.status_id];
		if(this.state.jobData === undefined){
			// return <p>Not Found</p>;
			return <NotFound/>;
		}
		// if(this.state.jobData.job_sub_status === null) { 
		// 	return <div>HI</div>;
		// }
		const pageStructure = (
			
			<div className="job-page-container">
				{/* <h1>Job: {this.state.jobData.job_number}</h1>
				<span># {this.state.jobData.job_uid}</span>
				<div>
					<h1> Payload </h1>
				</div> */}
				<div className="job-page-header"> 
					<h1>Job: {/*this.state.jobData.job_number*/this.state.jobData.job_topic } </h1>
					<span># {this.state.jobData.job_number} </span>
					<p># {this.state.jobData.job_uid} </p>
					<div>
						{this.state.jobData.job_sub_status === null && <p className = "null-sub-status"> No Sub Status</p> || 
						<p>{this.state.jobData.job_sub_status}</p>}
					</div>
				</div>
				<div className = "job-page-warning-section"> 
					<div>
						{this.state.jobData.status_id > 3 && <p><img className="status" src={FailureIcon} />  Jobs {status}</p> || 
						<p> <img className="status" src={SuccessIcon} /> Jobs {status}</p>}
					</div>
				</div>
				<div className = "job-page-payload-section"> 
					<h3>Payload</h3>
					{/* <div>ADD PAYLOAD</div> */}
					<div> { ("definition" in this.state.jobData) && <p>this.state.jobData.definition</p> || 
					<p className="empty-payload">Empty Payload</p> } </div>
				</div>
				<div className = "job-page-timeline-section"> 
					<h3>Time Line</h3>
					<div>ADD TIMELINE</div>
				</div>
				<div className = "job-page-parentJobs-section"> 
					<h3>Parent Jobs</h3>
					<div>ADD PARENT JOBS</div>
				</div>
			</div>

		);
		// console.log(JSON.stringify(this.state.jobData));
		return (
			<div>
				{/* {JSON.stringify(this.state.jobData)}; */}
				{/* Use job number as job name */}
				{/* {this.state.jobData.job_number}; */}
				{pageStructure}
			</div>
		);
	}
}

export default WithRouter(Job) ;