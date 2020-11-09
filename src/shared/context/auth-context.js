import { createContext } from "react";

// create a context object called AuthContext using createContext
// initialize and set the properties including login and logout methods
export const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	token: null,
	login: () => {},
	logout: () => {},
});
