import React from "react";
import Chart from "react-apexcharts";


function LineGraph(props){
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
