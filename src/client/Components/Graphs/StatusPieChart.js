import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import api from "../../api";

class StatusPieChart extends React.Component {

	static propTypes = {
		after: PropTypes.instanceOf(Date).isRequired,
		before: PropTypes.instanceOf(Date).isRequired,
		group: PropTypes.string,
		topic: PropTypes.string,
		status: PropTypes.string,
	};

	static defaultProps = {
		group: "",
		topic: "",
		status: ""
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
		const data = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
		await api.jobs("status_id", this.props.after.toISOString(), this.props.before.toISOString(), this.props.group, this.props.topic, this.props.status, 0, newJobs => {
			newJobs.forEach(job => { data[job.status_id] += 1; });
			this.setState({ data: data });
		});

		this.setState({ loading: false });
	}

	render() {

		const options = {
			labels: [
				"Created", "Read",
				"Acknowledged", "Successful",
				"Failed", "TimedOut", "Retried", "Cancelled"
			]
		};

		return <Chart type="pie" series={this.state.data} options={options} />;
	}
}

export default StatusPieChart;
