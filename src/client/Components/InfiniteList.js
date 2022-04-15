import React from "react";
import PropTypes from "prop-types";

class InfiniteList extends React.Component {

	static propTypes = {
		list: PropTypes.array.isRequired,
		render: PropTypes.func.isRequired,
		loading: PropTypes.element.isRequired
	};

	constructor(props) {
		super(props);
		this.state = { i: 50 };
	}

	componentDidMount() {
		const options = { root: null, rootMargin: "0px", threshold: 1.0 };
		this.observer = new IntersectionObserver(targets => {
			if (targets[0].isIntersecting) {
				this.setState({ i: this.state.i + 50 });
			}
		}, options);
		this.observer.observe(this.loadingRef);
	}

	componentWillUnmount() {
		this.observer.disconnect();
	}

	render() {
		return (
			<div>
				{this.props.list.slice(0, this.state.i).map(this.props.render)}
				<div ref={loadingRef => (this.loadingRef = loadingRef)}>
					{ this.loading && this.props.loading }
				</div>
			</div>
		);
	}
}

export default InfiniteList;
