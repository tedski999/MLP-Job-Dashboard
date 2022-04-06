import React from "react";
import { useParams } from "react-router-dom";

export default function Group() {
	const { name } = useParams();
	return (
		<div>
			<p>Group: {name}</p>
		</div>
	);
}