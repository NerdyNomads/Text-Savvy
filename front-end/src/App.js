import React, { useEffect } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import TextList from "./components/TextList";
import Sidebar from "./components/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function App() {
	const { isAuthenticated, user } = useAuth0();

	/**
	 * This function only runs when the state "isAuthenticated" changes.
	 * If someone is currently logged in, then this checks if the account needs to be added to the database.
	 */
	useEffect(async () => {
		if (isAuthenticated) {
			let userId = user.sub;
			let auth0Id = userId.replace("|", "-");	// Must replace "|" to allow for GET query

			if (await isNewAccount(auth0Id)) {
				addNewAccount(auth0Id);
			}
		}
	}, [isAuthenticated]);

	/**
	 * Checks if the user that is logged in has been added to the database.
	 * 
	 * @param {*} auth0Id 		The Auth0 ID of the current user.
	 * @returns 				If no account exists in the database, return true.
	 */
	async function isNewAccount(auth0Id) {
		let result = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/accounts/auth0/` + auth0Id);

		return result?.data.length == 0;
	}

	/**
	 * Adds a new account to the database.
	 * 
	 * @param {*} auth0Id 			The Auth0 ID of the current user.
	 */
	async function addNewAccount(auth0Id) {
		const account = {
			auth0Id: auth0Id,
			name: user.name,
			email: user.email,
			workspaces: []
		};

		await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/accounts/add/`, account)
			.then((res) => console.log(res.data));
	}

	if (!isAuthenticated) {
		return <LoginButton />;
	} else {
		return (
			<div className="App">
				<header className="App-header">
					<TextList />
					<Sidebar />
				</header>
			</div>
		);
	}
}

export default App;
