<<<<<<< HEAD
import React from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from '@auth0/auth0-react';


function App() {

  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <LoginButton/>
      <LogoutButton/>
      <Profile/>
    </>
  );
};

=======
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [data, setData] = React.useState(null);

    // Test backend connection using GET route from server.js
    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

                <p>{!data ? "Loading..." : data}</p>
            </header>
        </div>
    );
}
>>>>>>> FD/feat/setup-nodejs-express

export default App;