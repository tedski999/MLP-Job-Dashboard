import React, { useState } from "react";
import { Link } from "react-router-dom";
function List() {
	const [data] = useState([
		{ id: "24240"
			, title: "Job 1" },
		{ id: "25250"
			, title: "Job 2" },
		{ id: "26260"
			, title: "Job 3" },
		{ id: "27270"
			, title: "Job 4" }
	]);

	return (
		<div className="container">
			<ul className="list">
				{data.map(item =>(
					<li key={item.id}className="list-item">
						<Link to="/job">{item.title}: {item.id}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
export default List;