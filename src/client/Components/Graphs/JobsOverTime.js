import React from "react";
import FreqOverTime from "./FreqOverTime";
import PropTypes from "prop-types";
import api from "../../api";

class JobsOverTime extends React.Component {

	static propTypes = {
		after: PropTypes.instanceOf(Date).isRequired,
		before: PropTypes.instanceOf(Date).isRequired,
		group: PropTypes.string,
		topic: PropTypes.string,
		status: PropTypes.string,
		aggregation: PropTypes.string
	};

	static defaultProps = {
		group: "",
		topic: "",
		status: "",
		aggregation: "day"
	};

	constructor(props) {
		super(props);
		this.state = { loading: false, dates: [] };
	}

	componentDidMount() {
		this.fetchData();
	}

	async fetchData() {
		this.setState({ loading: true, dates: [] });
		const filters = { columns: "created_on", after: this.props.after, before: this.props.before, group: this.props.group, topic: this.props.topic, status: this.props.status };
		await api.jobs(filters, newJobs => {
			const newDates = newJobs.map(job => {
				const date = new Date(job.created_on);
				switch (this.props.aggregation) {
				case "day": date.setHours(0, 0, 0, 0); break;
				case "hour": date.setMinutes(0, 0, 0); break;
				case "minute": date.setSeconds(0, 0); break;
				case "second": date.setMilliseconds(0); break;
				}
				return date;
			});
			this.setState(prev => ({ dates: [ ...prev.dates, ...newDates ] }));
		});
		this.setState({ loading: false });
	}

	render() {

		let interval = 60*60; // 1 hour
		switch (this.props.aggregation) {
		case "day": interval = 60*60*24; break;
		case "hour": interval = 60*60; break;
		case "minute": interval = 60; break;
		case "second": interval = 1; break;
		}

		return (
			<FreqOverTime
				data={[{ label: "Jobs", dates: this.state.dates }]}
				after={this.props.after}
				before={this.props.before}
				interval={interval}
			/>
		);
	}
}

export default JobsOverTime;
