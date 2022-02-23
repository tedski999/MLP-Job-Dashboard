import React from "react";
import { render } from "react-dom";
// NOTE(ted):
// I haven't worked out decent SCSS scoping to React components yet,
// so all our styling is global like normal CSS
import "./style.scss";

import MyCoolComponent from "./MyCoolComponent/TestComponent";

render(<MyCoolComponent />, document.getElementById("root"));
