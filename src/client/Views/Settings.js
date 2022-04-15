import React from "react";
import api from "../api";

class Settings extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			settings: [],
			form: {
				topic: "",
				group: "",
				service: "",
				destination: ""
			}
		};

		this.load = this.load.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.deleteAlert = this.deleteAlert.bind(this);
	}

	async componentDidMount() {
		this.load();
	}

	async load() {
		this.setState({loading: true});
		this.setState({loading: false, settings: await api.alerts({})});
	}

	async onChange(e) {
		const {name, value} = e.target;
		this.setState({ form: {
			...this.state.form,
			[name]: value
		}});
	}

	async onSubmit() {
		await api.setAlert(this.state.form.topic, this.state.form.group, this.state.form.service, this.state.form.destination);
		this.load();
	}

	async deleteAlert() {
		await api.deleteAlerts(this.state.form);
		this.load();
	}

	render() {
		return (
			<div className="settings-page">
				<br />
				<h1 className="header">Alerts Configuration</h1>
				<br />
				<form>
					<input
						placeholder="Topic" name="topic" type="text"
						value={this.state.form.topic}
						onChange={this.onChange}
					/>
					<input
						placeholder="Group" name="group" type="text"
						value={this.state.form.group}
						onChange={this.onChange}
					/>
					<input
						placeholder="Service" name="service" type="text"
						value={this.state.form.service}
						onChange={this.onChange}
					/>
					<input
						placeholder="Destination" name="destination" type="text"
						value={this.state.form.destination}
						onChange={this.onChange}
					/>
					<br />
				</form>
				<button onClick={this.onSubmit}>Add alert configuration</button>
				<button onClick={this.deleteAlert}>Delete matching alerts</button>
				<br />
				<br />
				{ this.state.loading && <p>Loading alert settings...</p> }
				{this.state.settings.map(setting => {
					const key = setting.job_topic + setting.group_name + setting.service + setting.destination;
					return <p key={key} className="config-entry">
						[{setting.job_topic} - {setting.group_name}]: {setting.destination} via {setting.service}
					</p>;
				})}
			</div>
		);
	}
}

export default Settings;
