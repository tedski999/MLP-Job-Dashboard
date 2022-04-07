import React from "react";
import PropTypes from "prop-types";

class InfiniteList extends React.Component {

	static propTypes = {
		data: PropTypes.array.isRequired,
		fetchData: PropTypes.func.isRequired,
		loading: PropTypes.element.isRequired,
		renderItem: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = { loading: false };
	}

	componentDidMount() {
		const options = { root: null, rootMargin: "0px", threshold: 1.0 };
		this.observer = new IntersectionObserver(targets => {
			if (targets[0].isIntersecting && !this.state.loading) {
				this.loadMore();
			}
		}, options);
		this.observer.observe(this.loadingRef);
	}

	componentWillUnmount() {
		this.observer.disconnect();
	}

	async loadMore() {
		this.setState({ loading: true });
		await this.props.fetchData();
		this.setState({ loading: false });
	}

	render() {
		return (
			<div>
				{this.props.data.map(this.props.renderItem)}
				<div ref={loadingRef => (this.loadingRef = loadingRef)}>
					{ this.state.loading && this.props.loading }
				</div>
			</div>
		);
	}
}

export default InfiniteList;
