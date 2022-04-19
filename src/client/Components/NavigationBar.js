import React from "react";
import {NavLink, useNavigate } from "react-router-dom";

function NavigationBar() {
	const navigate = useNavigate();
	return (
		<div className="navigation">
			<div className="navigation-bar">
				<div className="side side-left">
					{/*<NavLink to="/" className={navInfo => navInfo.isActive? "active" : ""}>Dashboard </ NavLink>*/}
					{/*<NavLink to="/jobs" className="button">Jobs</NavLink>*/}
					<NavLink to="/" className="button">Jobs</NavLink>
					<NavLink to="/topics" className="button">Topics</NavLink>
					<NavLink to="/groups" className="button">Groups</NavLink>
					<NavLink to="/settings" className="button">Settings</NavLink>
					<button onClick={() => navigate(-1)} title="Go previous page" className="previous round">Back </button>
				</div>
			</div>
		</div>
	);
}   
export default NavigationBar;
