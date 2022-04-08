import React from "react";
import PropTypes from "prop-types";

class JobFilterToolbar extends React.Component {

	static propTypes = {
		onChange: PropTypes.func.isRequired,
		after: PropTypes.instanceOf(Date).isRequired,
		before: PropTypes.instanceOf(Date).isRequired,
		group: PropTypes.string.isRequired,
		topic: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = { showFilters: false };
	}

	onChange(e) {
		const {name, value} = e.target;
		let after = name === "after" ? new Date(value) : this.props.after;
		let before = name === "before" ? new Date(value) : this.props.before;
		let group = name === "group" ? value : this.props.group;
		let topic = name === "topic" ? value : this.props.topic;
		let status = name === "status" ? value : this.props.status;
		this.props.onChange(after, before, group, topic, status);
	}

	render() {
		const buttonicon = this.state.showFilters ? "▲" : "▼";
		return (
			<div className="job-filter-toolbar">
				<p className="button" onClick={() => { this.setState({showFilters: !this.state.showFilters }); }}>
					{buttonicon} <span>Filters</span>
				</p>
				{this.state.showFilters &&
					<div className="filters">
						<input
							placeholder="After" name="after" type="date"
							value={this.props.after.toISOString().substring(0, 10)}
							onChange={this.onChange}
						/>
						<input
							placeholder="Before" name="before" type="date"
							value={this.props.before.toISOString().substring(0, 10)}
							onChange={this.onChange}
						/>
						<input
							placeholder="Group" name="group" type="text"
							value={this.props.group}
							onChange={this.onChange}
						/>
						<input
							placeholder="Topic" name="topic" type="text"
							value={this.props.topic}
							onChange={this.onChange}
						/>
						<input
							placeholder="Status" name="status" type="text"
							value={this.props.status}
							onChange={this.onChange}
						/>
					</div>
				}
			</div>
		);
	}
}

export default JobFilterToolbar;
