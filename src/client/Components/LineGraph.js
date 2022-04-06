import React from "react";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";

function LineGraph(props){

	LineGraph.propTypes = {
		options: PropTypes.object,
		series: PropTypes.array
	};
	
	return <div className="Jobs-List">
		<Chart 
			options={props.options}
			series={props.series}
			type="line"
			width="500"
		/>
	</div>;
}
export default LineGraph;