import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { ExitIcon } from "../atoms/icons";
import CollaboratorItem from "../molecules/CollaboratorItem";
import "./WorkspaceSettings.css";


function WorkspaceSettings({onChangeVisibility}) {
  const componentName = "WorkspaceSettings";

  const [renderedName, setRenderedName] = useState("");
  const [renderedCollaborators, setRenderedCollaborators] = useState([]);

  // formats a list of strings to a list of object contains {email, pending}
  const formatCollaborators = (list) =>
    list.map((i) => ({email: i, pending: false}));
  

  useEffect(() => { 
    // FETCH DATA Calls here
    // (data we need: list of collaborators, workspace name, and workspaceid)
    // we need workspaceid for patching later.
    

    // then Convert workspace data to a format we want

    const fakeFormattedWorkspaceData = {
      name: "My workspace",
      collaborators: ["email1@email.com", "email2@email.com", "email2@email.com"],
      id: "1"
    };

    setRenderedCollaborators(formatCollaborators(fakeFormattedWorkspaceData.collaborators));
    setRenderedName(fakeFormattedWorkspaceData.name);

  }, []);

  const handleBackgroundClick = (e) => {
    // clicked outside of modal
    if(e.target.className == `${componentName}-background`) {
      onChangeVisibility(false);
    }
  };

  // const handleExitClick = () => {
  //   onChangeVisibility(false);
  // };

  const handleRemoveCollaborator = (email) => {
    console.log("Remove this collaborator: ", email);
  };

  const renderColaboratorList = () => 
    renderedCollaborators.map(
      (col) => <CollaboratorItem key={Math.random()} email={col.email} onRemove={handleRemoveCollaborator}/>
    );
  

  return (
    <div className={`${componentName}-background`} onClick={handleBackgroundClick}>
      <div className={`${componentName}`}>
        <ExitIcon/>
        <div className={`${componentName}-header`}>
          {/* editable workspace name */}
          {renderedName}
        </div>
        <div className={`${componentName}-body`}>
          {/* collab list stuff */}
          {renderColaboratorList()}
        </div>
        <div className={`${componentName}-footer`}>
          {/* Save Button */}
        </div>
      </div>
    </div>
  );

}

WorkspaceSettings.propTypes = {
  onChangeVisibility: PropTypes.func.isRequired,
};

export default WorkspaceSettings;