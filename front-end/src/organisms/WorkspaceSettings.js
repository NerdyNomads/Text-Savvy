import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { ExitIcon, AddCollabIcon } from "../atoms/icons";
import ErrorMessage from "../atoms/ErrorMessage";
import CollaboratorItem from "../molecules/CollaboratorItem";
import Button from "../atoms/Button";
import "./WorkspaceSettings.css";

import { isValidEmail } from "../util/util";

function WorkspaceSettings({ onChangeVisibility }) {
  const componentName = "WorkspaceSettings";

  const [renderedName, setRenderedName] = useState("");
  const [renderedCollaborators, setRenderedCollaborators] = useState([]);
  const [renderSave, setRenderSave] = useState(false);
  const [error, setError] = useState("");

  // formats a list of strings to a list of object contains {email, pending}
  const formatCollaborators = (list) => list.map((i) => ({ email: i, pending: false }));

  const handleAddCollaboratorKeyPress = e => {
    if(e.key === "Enter"){
      e.preventDefault();
      document.getElementById("collab-input").value = "";
      handleCollaboratorSubmit(e.target.value);
    }
  };

  const handleAddCollaboratorOnClick = () => (
    handleCollaboratorSubmit(document.getElementById("add-collaborator-email-input").value)
  );

  const handleCollaboratorSubmit = email => {
    // VALIDATE EMAIL FORMAT HERE
    const validEmail = isValidEmail(email);

    if(validEmail){
      setError("");
      submitCollaborator(email);
      document.getElementById("add-collaborator-email-input").value = "";
    } else {
      setError("Must be a valid email");
    }
  };

  const submitCollaborator = (newCollaborator) => {
    const newCollabList = [{ email: newCollaborator, pending: true }, ...renderedCollaborators];
    setRenderedCollaborators(newCollabList);
    setRenderSave(true);
  };

  useEffect(() => {
    // FETCH DATA Calls here
    // (data we need: list of collaborators, workspace name, and workspaceid)
    // we need workspaceid for patching later.

    // then Convert workspace data to a format we want

    const fakeFormattedWorkspaceData = {
      name: "My workspace",
      collaborators: [
        "email2@email.com",
        "email2@email.com",
        "email2@email.com",
        "email2@email.com",
      ],
      id: "1",
    };

    setRenderedCollaborators(formatCollaborators(fakeFormattedWorkspaceData.collaborators));
    setRenderedName(fakeFormattedWorkspaceData.name);
  }, []);

  const handleBackgroundClick = (e) => {
    // clicked outside of modal
    if (e.target.className == `${componentName}-background`) {
      onChangeVisibility(false);
    }
  };

  const handleExitClick = () => onChangeVisibility(false);

  const handleRemoveCollaborator = (email) => console.log("Remove this collaborator: ", email);

  const renderColaboratorList = () =>
    renderedCollaborators.map(({ pending, email }) => (
      <CollaboratorItem
        key={Math.random()}
        pending={pending}
        email={email}
        onRemove={handleRemoveCollaborator}
      />
    ));

  const addCollaboratorElement = (
    <div className={`${componentName}-add-collab`}>
      <div className={`${componentName}-add-collab-top`}>
        <span className={`${componentName}-add-collab-label`}>Share with others:</span>
      </div>
      {/* Error Message */}
      {error ? <ErrorMessage message={`${error}`}/> : <></>}
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

        <div className={`${componentName}-header`}>{renderedName}</div>
        <div className={`${componentName}-body`}>
          {addCollaboratorElement}
          <div className={`${componentName}-collab-list`}>{renderColaboratorList()}</div>
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
};

export default WorkspaceSettings;
