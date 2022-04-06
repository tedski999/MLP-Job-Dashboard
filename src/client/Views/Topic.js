import React from "react";
import { useParams } from "react-router-dom";

export default function Topic() {
	const { name } = useParams();
	return (
		<div>
			<p>Topic: {name}</p>
		</div>
	);
}