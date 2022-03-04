import React from "react";
import LogoutButton from "../atoms/LogoutButton";
import "./Sidebar.css";


function Sidebar() {

  return (
    <div className="SideBar">
      <div>logo</div>
      <div className="SideBar-greeting">My Workspace</div>
      <div>Manage Account</div>
      <LogoutButton/>
    </div>
  );

}

export default Sidebar;