import React, { useState } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import TextList from "./components/TextList";
import Sidebar from "./components/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function App() {
	const { isAuthenticated } = useAuth0();

	const [email, setEmail] = useState(null);
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);

	function handleEmailChange(event) {
		setEmail(event.target.value);
	}

	function handleUsernameChange(event) {
		setUsername(event.target.value);
	}

	function handlePasswordChange(event) {
		setPassword(event.target.value);
	}

	const handleAccountSubmit = (event) => {
		event.preventDefault();

		const account = {
			externalLog: false,
			email: email,
			username: username,
			password: password,
		};

		axios
			.post("http://localhost:5000/accounts/add", account)
			.then((res) => console.log(res.data));
	};

	if (!isAuthenticated) {
		return <LoginButton />;
	} else {
		return (
			<div className="App">
				<header className="App-header">
					<TextList />
					<Sidebar />
				</header>
				<h1>Account Input Test</h1>
				<form id="account_form" onSubmit={handleAccountSubmit}>
					<label htmlFor="email">Email:</label>
					<br />
					<input type="text" id="email" name="email" onChange={handleEmailChange} />
					<br />
					<label htmlFor="username">User Name:</label>
					<br />
					<input
						type="text"
						id="username"
						name="username"
						onChange={handleUsernameChange}
					/>
					<br />
					<label htmlFor="password">Password:</label>
					<br />
					<input
						type="text"
						id="password"
						name="password"
						onChange={handlePasswordChange}
					/>
					<br />
					<br />
					<input type="submit" value="submit" />
				</form>
				<p id="account_create"></p>
				<br />
				<h1>Workspace Input Test</h1>
				<form id="workspace_form">
					<label htmlFor="workspace_name">Name:</label>
					<br />
					<input type="text" id="workspace_name" name="workspace_name" />
					<br />
					<br />
					<input type="submit" value="submit" />
				</form>
				<p id="workspace_create"></p>
				<br />
				<h1>Text Content Input Test</h1>
				<form id="text_form">
					<label htmlFor="text_content_name">Name:</label>
					<br />
					<input type="text" id="text_content_name" name="text_content_name" />
					<br />
					<label htmlFor="text_value">Text:</label>
					<br />
					<input type="text" id="text_value" name="text_value" />
					<br />
					<label htmlFor="source">Source:</label>
					<br />
					<input type="text" id="source" name="source" />
					<br />
					<br />
					<input type="submit" value="submit" />
				</form>
				<p id="text_create"></p>
				<br />
			</div>
		);
	}
}

export default App;
