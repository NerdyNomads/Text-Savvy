import React from "react";
import PropTypes from "prop-types";

import "./ConfirmationPopup.css";
import Button  from "../atoms/Button";
import DeleteButton  from "../atoms/DeleteButton";
import { getWorkspaceAccounts, updateAccountWorkspaces, deleteWorkspace, deleteText, getWorkspaceTexts } from "../util/requests";

function ConfirmationPopup({ onChangeDeleteVisibility, workspaceId }) {
  const componentName = "ConfirmationPopup";
  const spacer = <div className={`${componentName}-spacing`}/>;

  const handleBackgroundClick = (e) => {
    // clicked outside of modal
    if (e.target.className == `${componentName}-background`) {
      onChangeDeleteVisibility(false);
    }
  };

  const handleCancelDelete = () => {
    onChangeDeleteVisibility(false);
  };

  const handleDelete = async () => {
    await deleteWorkspace(workspaceId);

    let texts = (await getWorkspaceTexts(workspaceId)).data;
    texts.forEach( async (text) => {
      await deleteText(text._id);
    });

    let accounts = (await getWorkspaceAccounts(workspaceId)).data;
    accounts.forEach( async (account) => {
      let newWorkspaces = account.workspaces.filter(workspace => workspace !== workspaceId);
      await updateAccountWorkspaces(account._id, newWorkspaces);
    });

    onChangeDeleteVisibility(false);
    window.location.reload(false);
  };

  return (
    <div className={`${componentName}-background`} onClick={handleBackgroundClick}>
      <div className={`${componentName}`} >
        <span className={`${componentName}-header-label`} >Are you sure you want to delete this workspace?</span>
        <div className={`${componentName}-buttons`}>
          <div className={`${componentName}-cancel`} onClick={handleCancelDelete}><DeleteButton label="Cancel" /></div>
          {spacer}
          <div className={`${componentName}-confirm`} onClick={handleDelete}><Button label="Confirm"/></div>
        </div>
      </div>
    </div>
  );
}

ConfirmationPopup.propTypes = {
  onChangeDeleteVisibility: PropTypes.func.isRequired,
  workspaceId: PropTypes.string.isRequired
};
    
export default ConfirmationPopup;
