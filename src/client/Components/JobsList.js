import React from "react";
import EnhancedTable from "./EnhancedTabled";
import Timeline from "./Timeline";

function JobsList(){
	return <div className="Jobs-List">
		JOBS LIST PAGE
		<div><EnhancedTable></EnhancedTable></div>
		<div><Timeline></Timeline></div>
	</div>;
}
export default JobsList;
