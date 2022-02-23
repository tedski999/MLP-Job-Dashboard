import React from "react";
import logo from "./logo.png";

class CoolComponent extends React.Component {

	constructor(props) {
		super(props);

		// Set the initial state
		this.state = {
			requestedData: "Loading..."
		};

		// Make a request to our API
		fetch("/v1/my_cool_endpoint")

			// Once the response has been received...
			.then(response => {
				// Throw an error if we don't get an OK response
				if (!response.ok)
					throw "Error " + response.status;
				// Otherwise, parse the response into a string
				return response.text();
			})

			// Once the response has been parsed...
			.then(data => {
				// Update our React state with the received data
				this.setState({requestedData: "API response: " + data});
			})

			// If any exceptions occur...
			.catch(err => {
				// Update our React state with the error
				this.setState({requestedData: "Request failed: " + err});
			});
	}

	render() {
		const message = "Hello, React.js!";
		return (
			<div className="CoolComponentStyling">
				<h3>{message}</h3>
				<img src={logo} />
				<p>{this.state.requestedData}</p>
			</div>
		);
	}
}

export default CoolComponent;
