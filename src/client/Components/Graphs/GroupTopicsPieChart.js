import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import api from "../../api";

class GroupTopicsPieChart extends React.Component {

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
		this.state = { loading: false, data: {} };
	}

	componentDidMount() {
		this.fetchData();
	}

	async fetchData() {
		this.setState({ loading: true, data: {} });
		const data = {};

		const filters = { columns: "job_topic,group_name,status_id", after: this.props.after, before: this.props.before, group: this.props.group, topic: this.props.topic, status: this.props.status };
		await api.jobs(filters, newJobs => {
			newJobs.forEach(job => {
				const name = job.job_topic + " / " + job.group_name;
				data[name] = data[name] + 1 || 1;
			});
			this.setState({ data: data });
		});
		this.setState({ loading: false });
	}

	render() {
		const categories = Object.keys(this.state.data);
		const series = categories.map(k => {
			return this.state.data[k];
		});
		const options = {
			labels: categories
		};
		return <Chart type="pie" series={series} options={options} />;
	}
}

export default GroupTopicsPieChart;
