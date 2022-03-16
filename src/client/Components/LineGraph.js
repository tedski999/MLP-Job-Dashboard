import React from "react";
import { ResponsiveLine } from "@nivo/line";

function LineGraph(props){
	return <div className="Jobs-List">
        {props.data}
	</div>;
}
export default LineGraph;
