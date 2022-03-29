import React from "react";
import {NavLink, useNavigate } from "react-router-dom";

function NavigationBar() {
	const navigate = useNavigate();
	return (
		<div className="navigation">
			<div className="navigation-bar">
				<div className="side side-left">
					<NavLink to="/" className={navInfo => navInfo.isActive? "active" : ""}>Home </ NavLink>
					<NavLink to="/jobsList" className="button">Jobs List </NavLink>
					<NavLink to="/line" className="navbar-btn">Line Graph </NavLink>
					<button onClick={() => navigate(-1)} title="Go previous page">Back </button>
				</div>
			</div>
		</div>
	);
}   
export default NavigationBar;
