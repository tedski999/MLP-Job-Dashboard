import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

class FreqPieChart extends React.Component {

	static propTypes = {
		data: PropTypes.object.isRequired
	};

	render() {
		const data = Object.values(this.props.data).map(dates => {
			return Object.values(dates).reduce((a, b) => a + b, 0);
		});
		const options = { labels: Object.keys(this.props.data) };
		return <Chart type="pie" series={data} options={options} />;
	}
}

export default FreqPieChart;
