import React from "react";
import PropTypes from "prop-types";

import "./ConfirmationPopup.css";
import Button  from "../atoms/Button";
import DeleteButton  from "../atoms/DeleteButton";

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

  const handleDelete = () => {
    //Put code to delete this workspace here
    console.log("Deleting workspace with ID: " + workspaceId);
    onChangeDeleteVisibility(false);
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
