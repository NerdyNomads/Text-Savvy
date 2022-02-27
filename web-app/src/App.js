import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from "./components/Profile";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function App() {
	const [data, setData] = React.useState(null);
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

    const handleAccountSubmit = event => {
        event.preventDefault();

        const account = {
            externalLog: false,
            email: email,
            username: username,
            password: password
        }

        axios.post('http://localhost:5000/accounts/add', account)   
            .then(res => console.log(res.data));
    };

	if (!isAuthenticated) {
		return <LoginButton />;
	} else {
		return (
			<div className="App">
				<header className="App-header">
					<p>{!data ? "Loading..." : data}</p>
					<TextList />
					<Sidebar />
				</header>
			</div>
		);
	}
}

export default App;
