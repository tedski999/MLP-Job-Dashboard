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
			<div>
				{this.state.jobData.job_number}
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