import React from "react";
import BasicList from "./BasicList";
import AlignItemsList from "./AlignItemsList";

function JobsList(){
	return <div className="Jobs-List">
        JOBS LIST PAGE
		{/* <div><BasicList></BasicList></div> */}
		<div><AlignItemsList></AlignItemsList></div>
	</div>;
}
export default JobsList;
