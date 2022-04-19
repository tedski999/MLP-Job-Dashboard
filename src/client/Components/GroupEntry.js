import React from "react";
import PropTypes from "prop-types";
import GroupIcon from "../Resources/group.png";
import util from "../util";

class GroupEntry extends React.Component {

	static propTypes = {
		group: PropTypes.object.isRequired
	};

	render() {

		const group = this.props.group;

		// TODO: recent failures
		let background = "#eeeeee";

		return (
			<div className="group-entry" style={{ background: background }} key={group.name}>
				<a className="icon" href={`/groups/${group.name}`}>
					<img src={GroupIcon} />
				</a>

				<div className="details">
					<p><a href={`/groups/${group.name}`}>{group.name}</a></p>
					<p>Found within {group.topics.size} topics, contains {group.jobs.size} jobs</p>
				</div>

				<div className="time">
					<p><a href={`/groups/${group.name}`}>Updated {util.timeSince(group.updated)} ago</a></p>
				</div>
			</div>
		);
	}
}

export default GroupEntry;
