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
		await api.jobs("created_on", this.props.after.toISOString(), this.props.before.toISOString(), this.props.group, this.props.topic, this.props.status, 0, newJobs => {
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
		return (
			<FreqOverTime
				data={[{ label: "Jobs", dates: this.state.dates }]}
				after={this.props.after}
				before={this.props.before}
			/>
		);
	}
}

export default JobsOverTime;
