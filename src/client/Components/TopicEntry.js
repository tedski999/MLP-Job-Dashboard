import React from "react";
import PropTypes from "prop-types";
import TopicIcon from "../Resources/topic.png";
import util from "../util";

class TopicEntry extends React.Component {

	static propTypes = {
		topic: PropTypes.object.isRequired
	};

	render() {

		const topic = this.props.topic;

		// TODO: recent failures
		let background = "#eeeeee";

		return (
			<div className="topic-entry" style={{ background: background }} key={topic.name}>
				<a className="icon" href={`/topics/${topic.name}`}>
					<img src={TopicIcon} />
				</a>

				<div className="details">
					<p><a href={`/topics/${topic.name}`}>{topic.name}</a></p>
					<p>Contains {topic.groups.size} groups and {topic.jobs.size} jobs</p>
				</div>

				<div className="time">
					<p><a href={`/topics/${topic.name}`}>Updated {util.timeSince(topic.updated)} ago</a></p>
				</div>
			</div>
		);
	}
}

export default TopicEntry;
