import React from "react";
import api from "../api";

class Settings extends React.Component {

	constructor(props) {
		super(props);
		this.addAlert = this.addAlert.bind(this);
		this.state = {
			settings: []
		};
	}

	async componentDidMount() {
		let alerts = await api.alerts("", "", "", "");
		this.setState({settings: alerts});
	}

	async addAlert() {
		await api.setAlert("topic_1", "group_1", "service_1", "dst_1");
		await api.setAlert("topic_1", "group_1", "service_1", "dst_2");
		let alerts = await api.alerts("", "", "", "");
		this.setState({settings: alerts});
	}

	render() {
		return (
			<div>
				<p>Alerts:</p>
				{this.state.settings.map(setting => {
					const key = setting.job_topic + setting.group_name + setting.service + setting.destination;
					return <p key={key}>{setting.job_topic} and {setting.group_name} is {setting.service} in {setting.destination}</p>;
				})}
				<button onClick={this.addAlert}>Add alert</button>
			</div>
		);
	}
}

export default Settings;
