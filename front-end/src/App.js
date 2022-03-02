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
			let auth0IdProperties = userId.split("|");

			let auth0IdProvider = auth0IdProperties[0];
			let auth0Id = auth0IdProperties[1];

			if (await isNewAccount(auth0Id, auth0IdProvider)) {
				addNewAccount(auth0Id, auth0IdProvider);
			}
		}
	}, [isAuthenticated]);

	/**
	 * Checks if the user that is logged in has been added to the database.
	 * 
	 * @param {*} id 			The Auth0 ID of the current user.
	 * @param {*} idProvider 	The Auth0 ID Provider of the current user.
	 * @returns 				If no account exists in the database, return true.
	 */
	async function isNewAccount(id, idProvider) {
		let result = await axios.get("http://localhost:5000/accounts/auth0/" + id + "/" + idProvider);

		return result?.data.length == 0;
	}

	/**
	 * Adds a new account to the database.
	 * 
	 * @param {*} id 			The Auth0 ID of the current user.
	 * @param {*} idProvider 	The Auth0 ID Provider of the current user.
	 */
	async function addNewAccount(id, idProvider) {
		const account = {
			auth0Id: id,
			auth0IdProvider: idProvider,
			workspaces: []
		};

		await axios.post("http://localhost:5000/accounts/add", account)
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
