import React from "react";
import {useParams } from "react-router-dom";

// Code below raises linting error of "Component definition is missing display name  react/display-name"
// export default function WithRouter( Child ) {
// 	return (props) => {
// 		const params = useParams();
// 		// const navigate = useNavigate();
// 		return <Child { ...props } params ={ params } />;
// 	};
// }

export default function WithRouter( Child ) {
	return function WithRouter(props) {
		const params = useParams();
		// const navigate = useNavigate();
		return <Child { ...props } params ={ params } />;
	};
}