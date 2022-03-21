import React, { useState } from "react"; import { Link } from "react-router-dom";
function Detail({ match: {
params: { id }
}
}) {
const [data] = useState({ title: "Item" }); return (
<div className="container">
<div className="card">
<h1>{data.title}</h1>
<h3>ID: {id}</h3>
<Link to="/JobsList">Click for the List View</Link>
</div>
</div>
);
}
export default Detail;