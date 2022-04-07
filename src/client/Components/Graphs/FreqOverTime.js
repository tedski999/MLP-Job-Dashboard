import React from "react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";

class FreqOverTime extends React.Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
		after: PropTypes.instanceOf(Date).isRequired,
		before: PropTypes.instanceOf(Date).isRequired,
		interval: PropTypes.number.isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {

		const series = [];
		this.props.data.forEach(data => {
			const frequencies = [];
			for (const dt = new Date(this.props.after); dt <= this.props.before; dt.setTime(dt.getTime() + this.props.interval * 1000)) {
				frequencies[dt] = 0;
			}
			data.dates.forEach(date => {
				frequencies[date] = frequencies[date] + 1 || 1;
			});
			series.push({
				name: data.label,
				data: Object.keys(frequencies).map(date => {
					return { x: date, y: frequencies[date] };
				})
			});
		});

		const options = {
			chart: { id: "area-datetime", animations: { enabled: false } },
			tooltip: { x: { format: "dd MMM HH:mm" } },
			dataLabels: { enabled: false },
			xaxis: {
				type: "datetime",
				min: this.props.after.getTime(),
				max: this.props.before.getTime()
			},
			yaxis: { min: 0 }
		};

		return <Chart type="area" series={series} options={options} />;
	}
}

export default FreqOverTime;
