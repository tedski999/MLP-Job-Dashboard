import React from "react";
import { useParams } from "react-router-dom";

export default function() {
	const { id } = useParams();
	return (
		<div>
			<p>Job: {id}</p>
		</div>
	);
}
