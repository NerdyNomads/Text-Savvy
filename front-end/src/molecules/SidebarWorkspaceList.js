import React from "react";

import SidebarWorkspaceItem from "../atoms/SidebarWorkspaceItem";


function SidebarWorkspaceList( ) {  
    
  const workspaces = [
    {name: "My Workspace", _id: 1},
    {name: "eThis is a very long workspace name", _id: 2},
    {name: "workspace1", _id: 3},
  ];

  const renderList = () => {
    return workspaces && workspaces.map( (workspaces) => {
      return <SidebarWorkspaceItem key={workspaces._id} name={workspaces.name}/>;
    });
  };

  return (
      
    <div className="SidebarWorkspaceList">
      {renderList()}
    </div>

   
  );
}

export default SidebarWorkspaceList;