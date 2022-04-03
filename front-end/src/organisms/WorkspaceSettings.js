import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { ExitIcon, AddCollabIcon, EditIcon, SaveIcon } from "../atoms/icons";
import ErrorMessage from "../atoms/ErrorMessage";
import CollaboratorItem from "../molecules/CollaboratorItem";
import ConfirmationPopup from "../molecules/ConfirmationPopup";
import Button  from "../atoms/Button";
import DeleteButton from "../atoms/DeleteButton";
import "./WorkspaceSettings.css";

import { isValidEmail } from "../util/util";
import { getAccountByEmail, getWorkspaceInfo, updateWorkspace, updateAccountWorkspaces } from "../util/requests";

function WorkspaceSettings({ onChangeVisibility, workspaceId }) {
  const componentName = "WorkspaceSettings";

  const [renderedName, setRenderedName] = useState("");
  const [renderedCollaborators, setRenderedCollaborators] = useState([]);
  const [showDeleteWorkspacePopup, setShowDeleteWorkspacePopup ] = useState(false);
  const [renderSave, setRenderSave] = useState(false);
  const [collabError, setCollabError] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleError, setTitleError] = useState("");

  const [newEmails, setNewEmails] = useState([]);
  const [deletedEmails, setDeletedEmails] = useState([]);

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
    const existingEmail = renderedCollaborators.filter((collaborator) => collaborator.email === email).length;

    if(validEmail && !existingEmail){
      setCollabError("");
      submitCollaborator(email);
      document.getElementById("add-collaborator-email-input").value = "";
    } else if (!validEmail) {
      setCollabError("Must be a valid email.");
    } else if (existingEmail) {
      setCollabError("User has already been added.");
    }
  };

  const handleUpdateWorkspace = (async () => {
    let collaborators = renderedCollaborators.map(collaborator => collaborator.email);

    let updatedWorkspace = {
      name: renderedName, 
      collaborators: collaborators,
      updateDate: Date.now()
    };
    await updateWorkspace(workspaceId, updatedWorkspace);

    updateAccountsWorkspaces(newEmails, true);
    updateAccountsWorkspaces(deletedEmails, false);

    setNewEmails([]);
    setDeletedEmails([]);
    setRenderedCollaborators(formatCollaborators(collaborators));
    setRenderSave(false);
  });

  const updateAccountsWorkspaces = async (emails, newEmails) => {
    emails.forEach(async (email) => {
      let result = await getAccountByEmail(email);

      if (result.data[0]) {
        let id = result.data[0]._id;
        let newWorkspaces;
        
        // If we're adding new emails, add the current workspace to the user's workspaces.
        // Otherwise, we're deleting emails and should filter out the current workspace from the user's workspaces.
        if (newEmails) {
          newWorkspaces = [ workspaceId, ...result.data[0].workspaces ];
        } else {
          newWorkspaces = result.data[0].workspaces.filter( workspace => workspace !== workspaceId);
        }
        
        await updateAccountWorkspaces(id, newWorkspaces);
      }
    });
  };

  const submitCollaborator = async (newCollaborator) => {
    const newCollabList = [{ email: newCollaborator, pending: true }, ...renderedCollaborators];
    setRenderedCollaborators(newCollabList);
    setRenderSave(true);

    const newEmailList = [newCollaborator, ...newEmails];
    setNewEmails(newEmailList);
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

  const handleOnChangePopupVisibility = (visible) => setShowDeleteWorkspacePopup(visible);
  
  const handleOnWorkspaceDelete = () => setShowDeleteWorkspacePopup(true);

  // Removes the first instance of the input email found in the renderedCollaborators list
  const handleRemoveCollaborator = (email) => {
    const collabCopy = [...renderedCollaborators];
    const removalIndex = collabCopy.findIndex(item => item.email === email);
    if(removalIndex >= 0){
      collabCopy.splice(removalIndex, 1);
      setRenderedCollaborators(collabCopy);
      setRenderSave(true);

      const deletedEmailList = [email, ...deletedEmails];
      setDeletedEmails(deletedEmailList);
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
        <input type={"text"} id={"edit-title-input"} className={`${componentName}-header-edit-input`} defaultValue={renderedName}/> 
        <SaveIcon className={`${componentName}-header-edit-icon`} onClick={updateTitle} />
      </div>
    </> :
    <>
      <div className={`${componentName}-header-text`}>
        <div className={`${componentName}-header-text-title`}>{renderedName}</div>
        <EditIcon className={`${componentName}-header-text-icon`} onClick={() => setEditingTitle(edit =>  !edit)}/>
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
          <div className={`${componentName}-delete`} onClick={handleOnWorkspaceDelete}><DeleteButton label="Delete"/></div>
          <div className={`${componentName}-footer-pad`} />
          <div className={`${componentName}-save`}>{renderSave && <Button label="Save" onClick={handleUpdateWorkspace}/>}</div>
        </div>
        { showDeleteWorkspacePopup && <ConfirmationPopup workspaceId={workspaceId} onChangeDeleteVisibility={(visible) => handleOnChangePopupVisibility(visible)}/>}
      </div>
    </div>
  );
}

WorkspaceSettings.propTypes = {
  onChangeVisibility: PropTypes.func.isRequired,
  workspaceId: PropTypes.string.isRequired
};

export default WorkspaceSettings;
