import React from "react";

import { useAuth0 } from "@auth0/auth0-react";


import { GearSmallIcon, LogoutIcon } from "../atoms/icons";
import "./Sidebar.css";
import SidebarWorkspaceItem from "../atoms/SidebarWorkspaceItem";


function Sidebar() {

  const { logout } = useAuth0();

  const spacing = <div className="SideBar-spacing"/>;
  const divider = <div className="SideBar-divider"/>;
  const dividerLight = <div className="SideBar-divider-light"/>;
  const componentName = "SideBar";

  const handleManageAccountOnClick = () => {
    alert("Temporary: Manage Account subfeature coming soon.");
  };

  return (
    <div className={`${componentName}`}>
      <div className={`${componentName}-logo`}>
        <div className={`${componentName}-logo-text`}>TextSavvy</div>
      </div>
      {divider}

      <SidebarWorkspaceItem name="My Workspace"/>
      <SidebarWorkspaceItem name="This Is a very long Name for a workspace"/>
      <SidebarWorkspaceItem name="wokrpsace"/>
      
      {dividerLight}
      {spacing}

      

      <div className={`${componentName}-manageacc ${componentName}-option`} onClick={handleManageAccountOnClick}>
        <div className={`${componentName}-option-logo`}><GearSmallIcon/></div>
        <div className={`${componentName}-option-text`}>Manage Account</div>
      </div>
      <div className={`${componentName}-logout ${componentName}-option`} onClick={logout}>
        <div className={`${componentName}-option-logo`}><LogoutIcon/></div>
        <div className={`${componentName}-option-text`}>Logout</div>
      </div>
      
 
    </div>
  );

}

export default Sidebar;