import React from "react";
import GroupsList from "../Components/Lists/GroupsList";

class Groups extends React.Component {
	render() {
		return (
			<div className="groups-main-page-container">
				<br />
				<h1>Groups</h1>
				<GroupsList />
			</div>
		);
	}
}

export default Groups;
