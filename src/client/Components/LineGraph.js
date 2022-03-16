import React from "react";
import Chart from "react-apexcharts";

const options = {
    chart: {
        id: "this is the id"
    },
    xaxis: {
        categories: [1, 2, 3, 4, 5, 6]
    }
};

const series = [
    {
        name: "example",
        data: [10, 4, 18, 23, 82, 51]
    }
];

function LineGraph(props){
	return <div className="Jobs-List">
        <Chart 
            options={options}
            series={series}
            type="line"
            width="500"
        />
	</div>;
}
export default LineGraph;
