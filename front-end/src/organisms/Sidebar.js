import React from "react";

import { useAuth0 } from "@auth0/auth0-react";


import { GearSmallIcon, LogoutIcon } from "../atoms/icons";
import "./Sidebar.css";
import SidebarWorkspace from "../molecules/SidebarWorkspace";


function Sidebar() {

  // FAKE DB FOR UI
  // const workspaces = [
  //   {
  //     id: "1",
  //     name: "Test 1"
  //   },
  //   {
  //     id: "2",
  //     name: "Test 2"
  //   },
  //   {
  //     id: "3",
  //     name: "Test 3"
  //   }
  // ];

  // const texts = [
  //   {
  //     id: "10",
  //     text: "Testing text from Test 1",
  //     source: "https://www.test1.com",
  //     workspaceID: "1",
  //     creationDate: 1646724250020
  //   },
  //   {
  //     id: "20",
  //     text: "Testing text from Test 2",
  //     source: "https://www.test2.com",
  //     workspaceID: "2",
  //     creationDate: 1646760121099,

  //   },
  //   {
  //     id: "30",
  //     text: "Testing text from Test 3",
  //     source: "https://www.test3.com",
  //     workspaceID: "3",
  //     creationDate: 1646767121099
  //   }
  // ];

  const { logout, user } = useAuth0();

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
      {/* eslint-disable-next-line react/no-unescaped-entities */ }
      <div className={`${componentName}-title`}>{user.nickname}'s Workspaces</div>

      {dividerLight}

      <SidebarWorkspace/>

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