/* global chrome */
import React from "react";
import PropTypes from "prop-types";

import { useAuth0 } from "@auth0/auth0-react";

import { GearSmallIcon, LogoutIcon } from "../atoms/icons";
import SidebarWorkspace from "../molecules/SidebarWorkspace";

import "./Sidebar.css";

function Sidebar({onClickWorkspace}) {
  const { logout } = useAuth0();

  const spacing = <div className="SideBar-spacing"/>;
  const divider = <div className="SideBar-divider"/>;
  const dividerLight = <div className="SideBar-divider-light"/>;
  const componentName = "SideBar";

  const handleManageAccountOnClick = () => {
    console.log("Temporary: Manage Account subfeature coming soon.");
  };

  const handleGoToWorkspace = (id) => onClickWorkspace(id);
  
  const handleLogout = () => {
    window.localStorage.setItem("auth0Id", "");
    chrome.runtime.sendMessage(`${process.env.REACT_APP_EXTENSION_ID}`, { messageFromWeb: window.localStorage });
    console.log(window.localStorage);
    logout();
  };

  return (
    <div className={`${componentName}`}>
      <div className={`${componentName}-logo`}>
        <div className={`${componentName}-logo-text`}>TextSavvy</div>
      </div>
      {divider}
      <SidebarWorkspace onSelectWorkspace={handleGoToWorkspace}/>
      {dividerLight}
      {spacing}
      <div className={`${componentName}-manageacc ${componentName}-option`} onClick={handleManageAccountOnClick}>
        <div className={`${componentName}-option-logo`}><GearSmallIcon/></div>
        <div className={`${componentName}-option-text`}>Manage Account</div>
      </div>
      <div className={`${componentName}-logout ${componentName}-option`} onClick={handleLogout}>
        <div className={`${componentName}-option-logo`}><LogoutIcon/></div>
        <div className={`${componentName}-option-text`}>Logout</div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  onClickWorkspace: PropTypes.func.isRequired,
};


export default Sidebar;