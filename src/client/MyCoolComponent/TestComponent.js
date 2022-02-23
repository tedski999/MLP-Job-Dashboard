import React from "react";
import logo from "./logo.png";

class CoolComponent extends React.Component {
	render() {
		const message = "Hello, React.js!";
		return (
			<div className="CoolComponentStyling">
				<h3>{message}</h3>
				<img src={logo} />
			</div>
		);
	}
}

export default CoolComponent;
