import React from "react";
import "./App.css";
import LoginButton from "./atoms/LoginButton";
import TextList from "./molecules/TextList";
import Sidebar from "./organisms/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
	const [data, setData] = React.useState(null);
	const { isAuthenticated } = useAuth0();

	// Test backend connection using GET route from server.js
	React.useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	if (!isAuthenticated) {
		return <>
			<LoginButton/>
		</>;
	} 
	else {
		return (
			<div className="App">
				<header className="App-header">
					<p>{!data ? "Loading..." : data}</p>
					<TextList/>
					<Sidebar/>
				</header>
			</div>
		);}
}

export default App;
