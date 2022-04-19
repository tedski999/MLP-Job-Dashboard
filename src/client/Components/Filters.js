import React from "react";
import PropTypes from "prop-types";

class Filters extends React.Component {

	static propTypes = {
		filters: PropTypes.object.isRequired,
		update: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = { showFilters: false, filters: this.props.filters };
		this.onChange = this.onChange.bind(this);
		this.onChangeStatus = this.onChangeStatus.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		const {name, value} = e.target;
		const filters = Object.assign({}, this.state.filters);
		switch (name) {
		case "after": filters[name] = new Date(value); break;
		case "before": filters[name] = new Date(value); break;
		case "topic": filters[name] = value; break;
		case "group": filters[name] = value; break;
		}
		this.setState({ filters: filters });
	}

	onChangeStatus(e) {
		//const {name, value} = e.target;
		// TODO:
		console.log(e);
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.update(this.state.filters);
	}

	render() {
		const statuses = this.state.filters.status;
		const buttonIcon = this.state.showFilters ? "▲" : "▼";

		return (
			<div className="job-filters">

				<p className="button" onClick={() => { this.setState({showFilters: !this.state.showFilters }); }}>
					{buttonIcon} <span>Filters</span>
				</p>

				{this.state.showFilters &&
					<form onSubmit={this.onSubmit} className="filters">
						{"after" in this.state.filters && <input
							placeholder="After" name="after" type="date"
							value={this.state.filters.after.toISOString().substring(0, 10)}
							onChange={this.onChange}
						/>}
						{"before" in this.state.filters && <input
							placeholder="Before" name="before" type="date"
							value={this.state.filters.before.toISOString().substring(0, 10)}
							onChange={this.onChange}
						/>}
						{"topic" in this.state.filters && <input
							placeholder="Topic" name="topic" type="text"
							value={this.state.filters.topic}
							onChange={this.onChange}
						/>}
						{"group" in this.state.filters && <input
							placeholder="Group" name="group" type="text"
							value={this.state.filters.group}
							onChange={this.onChange}
						/>}
						{"status" in this.state.filters &&
							<div>
								<input name="status0" type="checkbox" value={statuses[0]} onChange={this.onChangeStatus} />
								<input name="status1" type="checkbox" value={statuses[1]} onChange={this.onChangeStatus} />
								<input name="status2" type="checkbox" value={statuses[2]} onChange={this.onChangeStatus} />
								<input name="status3" type="checkbox" value={statuses[3]} onChange={this.onChangeStatus} />
								<input name="status4" type="checkbox" value={statuses[4]} onChange={this.onChangeStatus} />
								<input name="status5" type="checkbox" value={statuses[5]} onChange={this.onChangeStatus} />
								<input name="status6" type="checkbox" value={statuses[6]} onChange={this.onChangeStatus} />
								<input name="status7" type="checkbox" value={statuses[7]} onChange={this.onChangeStatus} />
								<input name="status8" type="checkbox" value={statuses[8]} onChange={this.onChangeStatus} />
							</div>
						}
						<input type="submit" value="Search" />
					</form>
				}
			</div>
		);
	}
}

export default Filters;
