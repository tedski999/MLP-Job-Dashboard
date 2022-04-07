import React from "react";
import FreqOverTime from "./FreqOverTime";
import PropTypes from "prop-types";
import api from "../../api";

class StatusOverTime extends React.Component {

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
		this.state = { loading: false, data: [] };
	}

	componentDidMount() {
		this.fetchData();
	}

	async fetchData() {
		this.setState({ loading: true, data: [] });

		const data = [];
		await api.jobs("created_on,status_id", this.props.after.toISOString(), this.props.before.toISOString(), this.props.group, this.props.topic, this.props.status, 0, newJobs => {
			newJobs.forEach(job => {
				const date = new Date(job.created_on);
				switch (this.props.aggregation) {
				case "day": date.setHours(0, 0, 0, 0); break;
				case "hour": date.setMinutes(0, 0, 0); break;
				case "minute": date.setSeconds(0, 0); break;
				case "second": date.setMilliseconds(0); break;
				}
				let result = data.find(d => { return d.label === job.status_id; });
				if (result === undefined) {
					data.push({ label: job.status_id, dates: [date] });
				} else {
					result.dates.push(date);
				}
			});
			this.setState({ data: data });
		});

		this.setState({ loading: false });
	}

	render() {
		return (
			<FreqOverTime
				data={this.state.data}
				after={this.props.after}
				before={this.props.before}
			/>
		);
	}
}

export default StatusOverTime;
