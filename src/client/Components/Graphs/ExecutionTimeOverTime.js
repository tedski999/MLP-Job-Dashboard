import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import api from "../../api";

class ExecutionTimeOverTime extends React.Component {

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
		status: "3",
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
		await api.jobs("created_on,completed_at", this.props.after.toISOString(), this.props.before.toISOString(), this.props.group, this.props.topic, this.props.status, 0, newJobs => {

			newJobs.forEach(job => {
				const date = new Date(job.created_on);
				switch (this.props.aggregation) {
				case "day": date.setHours(0, 0, 0, 0); break;
				case "hour": date.setMinutes(0, 0, 0); break;
				case "minute": date.setSeconds(0, 0); break;
				case "second": date.setMilliseconds(0); break;
				}

				let d = data.find(element => element.x.getTime() === date.getTime());
				if (d === undefined) {
					d = { x: date, y: [] };
					data.push(d);
				}

				const execTime = (new Date(job.completed_at) - new Date(job.created_on)) / 1000;
				d.y.push(execTime);
			});

			this.setState(({ data: [{data:data}]}));
		});

		this.setState({ loading: false });
	}

	render() {

		const options = {
			chart: { animations: { enabled: false } },
			tooltip: { x: { format: "dd MMM HH:mm" } },
			xaxis: {
				type: "datetime",
				min: this.props.after.getTime(),
				max: this.props.before.getTime()
			},
			yaxis: { min: 0 }
		};

		return <Chart type="boxPlot" series={this.state.data} options={options} />;
	}
}

export default ExecutionTimeOverTime;
