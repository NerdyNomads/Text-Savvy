import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { ExitIcon, AddCollabIcon, EditIcon, SaveIcon } from "../atoms/icons";
import ErrorMessage from "../atoms/ErrorMessage";
import CollaboratorItem from "../molecules/CollaboratorItem";
import Button from "../atoms/Button";
import "./WorkspaceSettings.css";

import { isValidEmail } from "../util/util";
import { getWorkspaceInfo } from "../util/requests";

function WorkspaceSettings({ onChangeVisibility, workspaceId }) {
  const componentName = "WorkspaceSettings";

  const [renderedName, setRenderedName] = useState("");
  const [renderedCollaborators, setRenderedCollaborators] = useState([]);
  const [renderSave, setRenderSave] = useState(false);
  const [collabError, setCollabError] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleError, setTitleError] = useState("");

  // formats a list of strings to a list of object contains {email, pending}
  const formatCollaborators = (list) => list.map((i) => ({ email: i, pending: false }));

  const handleAddCollaboratorKeyPress = e => {
    if(e.key === "Enter"){
      e.preventDefault();
      handleCollaboratorSubmit(e.target.value);
    }
  };

  const handleAddCollaboratorOnClick = () => (
    handleCollaboratorSubmit(document.getElementById("add-collaborator-email-input").value)
  );

  const handleCollaboratorSubmit = email => {
    const validEmail = isValidEmail(email);

    if(validEmail){
      setCollabError("");
      submitCollaborator(email);
      document.getElementById("add-collaborator-email-input").value = "";
    } else {
      setCollabError("Must be a valid email");
    }
  };

  const submitCollaborator = (newCollaborator) => {
    const newCollabList = [{ email: newCollaborator, pending: true }, ...renderedCollaborators];
    setRenderedCollaborators(newCollabList);
    setRenderSave(true);
  };

  useEffect(async () => {
    const {name, collaborators} = (await getWorkspaceInfo(workspaceId)).data;

    setRenderedCollaborators(formatCollaborators(collaborators));
    setRenderedName(name);
  }, []);

  const handleBackgroundClick = (e) => {
    // clicked outside of modal
    if (e.target.className == `${componentName}-background`) {
      onChangeVisibility(false);
    }
  };

  const handleExitClick = () => onChangeVisibility(false);

  // Removes the first instance of the input email found in the renderedCollaborators list
  const handleRemoveCollaborator = (email) => {
    const collabCopy = [...renderedCollaborators];
    const removalIndex = collabCopy.findIndex(item => item.email === email);
    if(removalIndex >= 0){
      collabCopy.splice(removalIndex, 1);
      setRenderedCollaborators(collabCopy);
      setRenderSave(true);
    }
  };

  const renderCollaboratorList = () =>
    renderedCollaborators.map(({ pending, email }) => (
      <CollaboratorItem
        key={Math.random()}
        pending={pending}
        email={email}
        onRemove={handleRemoveCollaborator}
      />
    ));

  const updateTitle = () => {
    const newTitle = document.getElementById("edit-title-input").value;

    if(newTitle){
      setRenderedName(newTitle);
      document.getElementById("edit-title-input").value = "";
      setEditingTitle(false);
      setRenderSave(true);
    } else {
      setTitleError("Please input the new title");
    }
  };
  
  const header = editingTitle ? 
    <>
      {/* <label className={`${componentName}-edit-title-label`}>Workspace Title</label> */}
      {titleError ? <ErrorMessage message={`${titleError}`}/> : <></>}
      <div className={`${componentName}-header-edit`}>
        <input type={"text"} id={"edit-title-input"} className={`${componentName}-title-input`}/> 
        <SaveIcon className={`${componentName}-edit-header-icon`} onClick={updateTitle} />
      </div>
    </> :
    <>
      <div className={`${componentName}-header-text`}>
        {renderedName}
        <EditIcon className={`${componentName}-edit-header-icon`} 
          onClick={() => setEditingTitle(edit => {console.log(`updated title state from ${editingTitle} to ${!edit}`); return !edit;})}/>
      </div>
    </>;

  const addCollaboratorElement = (
    <div className={`${componentName}-add-collab`}>
      <div className={`${componentName}-add-collab-top`}>
        <span className={`${componentName}-add-collab-label`}>Share with others:</span>
      </div>
      {/* Error Message */}
      {collabError ? <ErrorMessage message={`${collabError}`}/> : <></>}
      <div className={`${componentName}-add-collab-bottom`}>
        <input
          onKeyPress={(e) => handleAddCollaboratorKeyPress(e)}
          id="add-collaborator-email-input"
          className={`${componentName}-add-collab-input`}
          type="text"
          placeholder="Enter collaborator's email"
        />
        <AddCollabIcon
          className={`${componentName}-add-collab-icon`}
          onClick={handleAddCollaboratorOnClick}
        />
      </div>
    </div>
  );

  return (
    <div className={`${componentName}-background`} onClick={handleBackgroundClick}>
      <div className={`${componentName}`}>
        <div className={`${componentName}-top`}>
          <ExitIcon className={`${componentName}-exit`} onClick={handleExitClick} />
        </div>

        <div className={`${componentName}-header`}>
          {/* Decide to display the header or the text box */}
          {header}
        </div>
        <div className={`${componentName}-body`}>
          {addCollaboratorElement}
          <div className={`${componentName}-collab-list`}>{renderCollaboratorList()}</div>
        </div>
        <div className={`${componentName}-footer`}>
          <div className={`${componentName}-footer-pad`} />
          <div className={`${componentName}-save`}>{renderSave && <Button label="Save" />}</div>
        </div>
      </div>
    </div>
  );
}

WorkspaceSettings.propTypes = {
  onChangeVisibility: PropTypes.func.isRequired,
  workspaceId: PropTypes.string.isRequired
};

export default WorkspaceSettings;
