import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

import { AddWorkspaceIcon } from "../atoms/icons";
import SidebarWorkspaceItem from "../atoms/SidebarWorkspaceItem";
import WorkspaceSettings from "../organisms/WorkspaceSettings";

import "./SidebarWorkspace.css";
import axios from "axios";

const componentName = "SidebarWorkspace";
function SidebarWorkspace( {onSelectWorkspace, accountId} ) {  
  const [ showAddWorkspace, setShowAddWorkspace ] = useState(false);
  const [ workspaceList, setWorkspaceList ] = useState([]);
  const [ showWorkspaceSettingPopup, setShowWorkspaceSettingPopup ] = useState(false);
  const [ currentWorkspaceId, setCurrentWorkspaceId ] = useState(null);

  const { user } = useAuth0();

  const handleWorkspaceSubmit = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      let newWorkspace = {
        name: e.target.value,
        owner: accountId,
        collaborators: [],
        isPublic: false,
        texts: [],
        creationDate: Date.now(),
        updateDate: null,
        deleteDate: null
      };

      await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/workspaces/add/`, newWorkspace)
        .then( async (res) => {
          const newWorkspaceList = [res.data, ...workspaceList];
          setWorkspaceList(newWorkspaceList);
          updateAccountWorkspaces(newWorkspaceList);

          e.target.value = "";
          setShowAddWorkspace(false);
          setCurrentWorkspaceId(res.data._id);
        });
    }
  };

  const updateAccountWorkspaces = async (newWorkspaceList) => {
    let id = accountId;
    let workspaceIds = newWorkspaceList.map(workspace => workspace._id);

    await axios.patch(`${process.env.REACT_APP_BACKEND_SERVER}/accounts/update/${id}`, {workspaces: workspaceIds});
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
    onSelectWorkspace(selectedId);
    setCurrentWorkspaceId(selectedId);
  };

  const renderList = () => (
    workspaceList && workspaceList.map( ({_id, name}) => 
      <SidebarWorkspaceItem key={_id} id={_id} selected={false} name={name} onEdit={handleOnWorkspaceEdit} onClickWorkspace={handleOnClickWorkspace}/>)
  );

  useEffect( async () => {
    if (accountId) {
      let email = user.email;
      let ownedWorkspaces = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/workspaces/byOwner/${accountId}/`);
      let collabWorkspaces = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/workspaces/byCollaborator/${email}/`);
      
      let workspaces = (ownedWorkspaces.data).concat(collabWorkspaces.data);

      if (workspaces.length > 0) {
        onSelectWorkspace(workspaces[0]._id); // by default the first workspace (recently will render)
        setCurrentWorkspaceId(workspaces[0]._id);
      } // else, do not show any workspace because there aren't any workspaces
    
      setWorkspaceList(workspaces);
    }
  }, [accountId]); 

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
      { showWorkspaceSettingPopup && <WorkspaceSettings workspaceId={currentWorkspaceId} onChangeVisibility={(visible) => handleOnChangeVisibility(visible)}/>}
    </div>
  );
}

SidebarWorkspace.propTypes = {
  onSelectWorkspace: PropTypes.func.isRequired,
  accountId: PropTypes.string.isRequired
};


export default SidebarWorkspace;