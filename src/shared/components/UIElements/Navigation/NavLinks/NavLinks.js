import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../../context/auth-context";
import "./NavLinks.css";
import Button from "../../../FormElements/Button/Button";

const NavLinks = (props) => {
	//using the useContext hook, to utilize AuthContext here in Navlinks
	//we are going to display difference navlinks depending on user login or not
	//this component will rerender whenever AuthContext changes
	const auth = useContext(AuthContext);
	//retrieve the
	const userId = auth.userId;

	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					ALL USERS
				</NavLink>
			</li>
			{/* if user is logged in */}
			{auth.isLoggedIn && (
				<React.Fragment>
					<li>
						<NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
					</li>

					<li>
						<NavLink to="/places/new">ADD PLACE</NavLink>
					</li>
				</React.Fragment>
			)}
			{/* if user is not logged in show authenticate link */}
			{!auth.isLoggedIn && (
				<li>
					<NavLink to="/auth">AUTHENTICATE</NavLink>
				</li>
			)}
			{auth.isLoggedIn && <Button onClick={auth.logout}>LOGOUT</Button>}
		</ul>
	);
};

export default NavLinks;
