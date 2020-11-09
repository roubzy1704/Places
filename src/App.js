import React, { Suspense } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
// import Users from "./user/pages/Users";
// import NewPlace from "./places/pages/NewPlace";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Auth from "./user/pages/Auth";

import Footer from "./shared/components/UIElements/Navigation/Footer/Footer";
import MainNavigation from "./shared/components/UIElements/Navigation/MainNavigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

/*these routes are loaded using the lazy method, or code splitting
Code-splitting your app can help you “lazy-load” just the things
that are currently needed by the user, which can dramatically improve 
the performance of your app. While you haven’t reduced the overall amount 
of code in your app, you’ve avoided loading code that the user may never 
need, and reduced the amount of code needed during the initial load.
So basically the imports below are not loaded on page load up, but
will be loaded when the user navigates there
https://reactjs.org/docs/code-splitting.html
//!{Suspense} is needed for routes to function in lazy mode
*/
const Users = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const App = () => {
	const { login, logout, token, userId } = useAuth();
	let routes;

	if (token) {
		routes = (
			// switch makes sure it doesnt move to the next route after a match is found
			<Switch>
				{/* exact makes sure the path is an exact match */}
				<Route path="/" exact>
					<Users />
				</Route>
				{/* :userId is a dynamic route  */}
				<Route path="/:userId/places" exact>
					<UserPlaces />
				</Route>
				<Route path="/places/new" exact>
					<NewPlace />
				</Route>
				<Route path="/places/:placeId">
					<UpdatePlace />
				</Route>
				{/* if path doesnt exist or an unknown path is entered redirect is used */}
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Users />
				</Route>
				<Route path="/:userId/places" exact>
					<UserPlaces />
				</Route>
				<Route path="/auth">
					<Auth />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	return (
		<div style={{ position: "relative", minHeight: "100vh" }}>
			<div style={{ paddingBottom: "100px" }}>
				{/* wrap the entire application that need the authcontext variables using
				authcontext.provider */}
				<AuthContext.Provider
					//bind the values we manage with auth context, to new values here
					//so that when a value changes all the component that listen to the context will rerender
					value={{ userId, isLoggedIn: !!token, token, login, logout }}
				>
					<Router>
						<MainNavigation />
						{/* add suspense and a fallback alternative if loading lazy takes too long*/}
						<main>
							<Suspense
								fallback={
									<div className="center">
										<LoadingSpinner />
									</div>
								}
							>
								{routes}
							</Suspense>
						</main>
					</Router>
				</AuthContext.Provider>
			</div>
			<Footer />
		</div>
	);
};

export default App;
