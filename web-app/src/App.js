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
    const { isLoading } = useAuth0();

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

    // Test backend connection using GET route from server.js
    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>{!data ? "Loading..." : data}</p>
                <LoginButton />
                <LogoutButton />
                <Profile />
            </header>

            <h1>Account Input Test</h1>
            <form id="account_form" onSubmit={handleAccountSubmit}>
                <label for="email">Email:</label><br />
                <input type="text" id="email" name="email" onChange={handleEmailChange}/><br />
                <label for="username">User Name:</label><br />
                <input type="text" id="username" name="username" onChange={handleUsernameChange}/><br />
                <label for="password">Password:</label><br />
                <input type="text" id="password" name="password" onChange={handlePasswordChange}/><br /><br />
                <input type="submit" value="submit"  />
            </form>
            <p id="account_create"></p><br />

            <h1>Workspace Input Test</h1>
            <form id="workspace_form">
                <label for="workspace_name">Name:</label><br />
                <input type="text" id="workspace_name" name="workspace_name" /><br /><br />
                <input type="submit" value="submit" />
            </form>
            <p id="workspace_create"></p><br />

            <h1>Text Content Input Test</h1>
            <form id="text_form">
                <label for="text_content_name">Name:</label><br />
                <input type="text" id="text_content_name" name="text_content_name" /><br />
                <label for="text_value">Text:</label><br />
                <input type="text" id="text_value" name="text_value" /><br />
                <label for="source">Source:</label><br />
                <input type="text" id="source" name="source" /><br /><br />
                <input type="submit" value="submit" />
            </form>
            <p id="text_create"></p><br />
        </div>
    );
}

export default App;
