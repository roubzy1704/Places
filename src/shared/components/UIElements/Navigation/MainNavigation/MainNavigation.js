import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "../MainHeader/MainHeader";
import NavLinks from "../NavLinks/NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../../BackDrop/BackDrop";
import "./MainNavigation.css";

const MainNavigation = (props) => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	return (
		<React.Fragment>
			{/* BackDrop is used to provide an overlay to deselect the sidedrawer compoent */}
			{drawerIsOpen && <BackDrop onClick={() => setDrawerIsOpen(false)} />}

			<SideDrawer show={drawerIsOpen} onClick={() => setDrawerIsOpen(false)}>
				<nav className="main-navigation__drawer-nav">
					<NavLinks />
				</nav>
			</SideDrawer>

			<MainHeader>
				{/* Hamburger button icon */}
				<button
					className="main-navigation__menu-btn"
					onClick={() => setDrawerIsOpen(true)}
				>
					<span />
					<span />
					<span />
				</button>

				{/* Title  */}
				<h1 className="main-navigation__title">
					<Link to="/">Your Places</Link>
				</h1>

				{/* nav links  */}
				<nav className="main-navigation__header-nav">
					<NavLinks />
				</nav>
			</MainHeader>
		</React.Fragment>
	);
};

export default MainNavigation;
