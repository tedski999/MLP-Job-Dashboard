import React from "react";
import {useParams } from "react-router-dom";


export default function WithRouter( Child ) {
	return ( props ) => {
		const params = useParams();
		// const navigate = useNavigate();
		return <Child { ...props } params ={ params } />;
	};
}