import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = (props) => {
	const content = (
		<CSSTransition
			in={props.show}
			timeout={200}
			classNames="slide-in-left"
			mountOnEnter
			unmountOnExit
		>
			<aside className="side-drawer" onClick={props.onClick}>
				{props.children}
			</aside>
		</CSSTransition>
	);
	//Portal allows you render a component in a different place than the component itself
	//this sider drawer is render in the drawer-hook div, which is in the index.html file
	//above the root div
	//look at backdrop component for a similar approach, portal requires some content in a div, and a dom call
	//to place on where to place that content
	return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
