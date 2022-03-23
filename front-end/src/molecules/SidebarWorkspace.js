import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { AddWorkspaceIcon } from "../atoms/icons";
import SidebarWorkspaceItem from "../atoms/SidebarWorkspaceItem";
import WorkspaceSettings from "../organisms/WorkspaceSettings";

import "./SidebarWorkspace.css";

const componentName = "SidebarWorkspace";
function SidebarWorkspace( {onSelectWorkspace} ) {  
  const [ showAddWorkspace, setShowAddWorkspace ] = useState(false);
  const [ workspaceList, setWorkspaceList ] = useState([]);
  const [ showWorkspaceSettingPopup, setShowWorkspaceSettingPopup ] = useState(false);

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

  const handleOnChangeVisibility = (visible) => setShowWorkspaceSettingPopup(visible);

  const handleOnClickWorkspace = (selectedId) => {

    const newWorkspaceList = workspaceList.map(({id, name}) => 
      // TODO: test is this comparitor works with string ids.
      selectedId == id ? { id, name, selected: true } : { id, name, selected: false }
    );
    onSelectWorkspace(newWorkspaceList);
  };

  const renderList = () => (
    workspaceList && workspaceList.map( ({id, name}) => 
      <SidebarWorkspaceItem key={id} selected={false} name={name} onEdit={handleOnWorkspaceEdit} onClickWorkspace={handleOnClickWorkspace}/>)
  );

  useEffect(() => {
    
    // Do GET request here
    
    const fakeWorkspace = [
      {name: "My Workspace", id: 1, selected: true}, // first was will always be selected = true, ad the rest are false.
      {name: "eThis is a very long workspace name", id: 2, selected: false},
      {name: "workspace1", id: 3, selected: false},
    ];

    if (fakeWorkspace.length > 0) {
      onSelectWorkspace(fakeWorkspace[0].id); // by default the first workspace (recently will render)
    } // else, do not show any workspace because there aren't any workspaces
    
    setWorkspaceList(fakeWorkspace);

  }, []); // empty second param in useEffect will only run once (on first load)


  const header = <div className={`${componentName}-header`}>
    <span>My Workspaces</span>
    <AddWorkspaceIcon className={`${componentName}-add-icon`} onClick={handleAddWorkspace}/>
  </div>;

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

SidebarWorkspace.propTypes = {
  onSelectWorkspace: PropTypes.func.isRequired,
};


export default SidebarWorkspace;