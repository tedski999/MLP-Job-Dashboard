import React from "react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";

class FreqOverTime extends React.Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	};

	render() {

		// Compute the number of occurrences of dates for each item in this.props.data
		const series = [];
		Object.entries(this.props.data).forEach(data => {
			const [label, dates] = data; // TODO

			/*
			// Zero out range of every possible date
			const min = Math.min.apply(null, dates);
			const max = Math.max.apply(null, dates);
			for (let dt = min; dt <= max; dt += interval) {
				frequencies[dt] = 0;
			}
			*/

			// Add data to series
			series.push({
				name: label,
				data: Object.entries(dates).map(datefreq => {
					const [date, frequency] = datefreq; // TODO
					return { x: date, y: frequency };
				})
			});
		});

		const options = {
			chart: { id: "area-datetime", animations: { enabled: false } },
			tooltip: { x: { format: "dd MMM HH:mm" } },
			dataLabels: { enabled: false },
			xaxis: { type: "datetime" },
			yaxis: { min: 0 }
		};

		return <Chart type="area" series={series} options={options} />;
	}
}

export default FreqOverTime;
