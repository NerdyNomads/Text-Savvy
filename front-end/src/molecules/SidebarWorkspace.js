import React, { useEffect, useState } from "react";

import { AddWorkspaceIcon } from "../atoms/icons";
import SidebarWorkspaceItem from "../atoms/SidebarWorkspaceItem";
import WorkspaceSettings from "../organisms/WorkspaceSettings";

import "./SidebarWorkspace.css";

const componentName = "SidebarWorkspace";
function SidebarWorkspace( ) {  

  const [ showAddWorkspace, setShowAddWorkspace ] = useState(false);
  const [ workspaceList, setWorkspaceList ] = useState([]);
  const [ showWorkspaceSettingPopup, setShowWorkspaceSettingPopup ] = useState(false);

  useEffect(() => {
    
    // Do GET request here
    
    const fakeWorkspace = [
      {name: "My Workspace", id: 1},
      {name: "eThis is a very long workspace name", id: 2},
      {name: "workspace1", id: 3},
    ];

    setWorkspaceList(fakeWorkspace);

  }, []); // empty second param in useEffect will only run once (on first load)

  const handleWorkspaceSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const newWorkspaceList = [{id: Math.random(), name:e.target.value}, ...workspaceList];
      setWorkspaceList(newWorkspaceList);
      e.target.value = "";

      // Do update request here

    }
  };

  const addWorkspaceInput = showAddWorkspace ?
    <div className={`${componentName}-add`}>
      <input 
        type="text" 
        autoFocus 
        placeholder="Enter Workspace Name"
        className={`${componentName}-add-input`}
        onKeyPress={(e) => handleWorkspaceSubmit(e)}/>
    </div> 
    : <></>;

  const handleAddWorkspace = () => setShowAddWorkspace(prevShow => !prevShow);


  const handleOnWorkspaceEdit = () => setShowWorkspaceSettingPopup(true);

  const handleOnClickWorkspace = () => console.log("Go to this workspace");

  const renderList = () => (
    workspaceList && workspaceList.map( ({id, name}) => 
      <SidebarWorkspaceItem key={id} name={name} onEdit={handleOnWorkspaceEdit} onClickWorkspace={handleOnClickWorkspace}/>)
  );

  const header = <div className={`${componentName}-header`}>
    <span>My Workspaces</span>
    <AddWorkspaceIcon className={`${componentName}-add-icon`} onClick={handleAddWorkspace}/>
  </div>;

  const handleOnChangeVisibility = (visible) => setShowWorkspaceSettingPopup(visible);

  return (
    <div className={`${componentName}`}>
      {header}
      {addWorkspaceInput}
      {renderList()}
      {/* Workspace Settings Pop Up */}
      { showWorkspaceSettingPopup && <WorkspaceSettings onChangeVisibility={(visible) => handleOnChangeVisibility(visible)}/>}
    </div>
  );
}

export default SidebarWorkspace;