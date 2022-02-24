import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from "./components/Profile";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from '@auth0/auth0-react';

function App() {
    const [data, setData] = React.useState(null);
    const { isLoading } = useAuth0();

    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    // function handleEmailChange(email) {
    //     setEmail(email);
    // }

    // const handleAccountSubmit = event => {
    //     // Get the data from the form.
    //     // event.target represents the form that is being submitted.
    //     var formData = new FormData(event.target);

    //     const account = new Account;

    //     var output = "";

    //     // Loop over each pair (name and value) in the form and add it to the values array.
    //     for (var pair of formData) {
    //         if (pair[0] == "email")
    //             account.email = pair[1];
    //         else if (pair[0] == "username")
    //             account.username = pair[1];
    //         else if (pair[0] == "password")
    //             account.password = pair[1];
    //     }
    //     output = "Email: " + account.email + " " +
    //         "Username: " + account.username + " " +
    //         "Password: " + account.password;

    //     console.log(output);

    //     event.preventDefault();
    // };

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
            <form id="account_form">
                <label for="email">Email:</label><br />
                <input type="text" id="email" name="email" /><br />
                <label for="username">User Name:</label><br />
                <input type="text" id="username" name="username" /><br />
                <label for="password">Password:</label><br />
                <input type="text" id="password" name="password" /><br /><br />
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
