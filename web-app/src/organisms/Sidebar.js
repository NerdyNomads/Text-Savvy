import React from "react";
import LogoutButton from "../atoms/LogoutButton";
import "./Sidebar.css";
class Sidebar extends React.Component {
	render() {
		return (
			<div className= "sidebar">
				<b>Welcome, Emmanuel!</b>
				<div>
                    Please Select a Workspace...
				</div>
				<LogoutButton/>
			</div>
		);
	}
}

export default Sidebar;