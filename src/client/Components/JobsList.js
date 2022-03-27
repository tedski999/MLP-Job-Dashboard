import React from "react";
import BasicList from "./BasicList";
import AlignItemsList from "./AlignItemsList";
import List from "./List";
import EnhancedTable from "./EnhancedTabled";

function JobsList(){
	return <div className="Jobs-List">
        JOBS LIST PAGE
		{/* <div><AlignItemsList></AlignItemsList></div> */}
		{/* <div><List></List></div> */}
		<div><EnhancedTable></EnhancedTable></div>
	</div>;
}
export default JobsList;
