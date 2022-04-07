import React from "react";
// import { useParams } from "react-router-dom";
import api from "../api";
import WithRouter from "../Components/WithRouter";
import NotFound from "./NotFound";
import PropTypes from "prop-types";

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
		if(this.state.jobData === undefined){
			// return <p>Not Found</p>;
			return <NotFound/>;
		}
		const pageStructure = (
			<div className="job-page-container">
				{/* <h1>Job: {this.state.jobData.job_number}</h1>
				<span># {this.state.jobData.job_uid}</span>
				<div>
					<h1> Payload </h1>
				</div> */}
				<div className="job-page-header"> 
					<h1>Job: {this.state.jobData.job_number} </h1>
					<span># {this.state.jobData.job_uid} </span>
				</div>
				<div className = "job-page-warning-section"> Warning
					<div>ADD WARNING</div>
				</div>
				<div className = "job-page-payload-section"> Payload
					<div>ADD PAYLOAD</div>
				</div>
				<div className = "job-page-timeline-section"> TimeLine
					<div>ADD TIMELINE</div>
				</div>
				<div className = "job-page-parentJobs-section"> Parent Jobs
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