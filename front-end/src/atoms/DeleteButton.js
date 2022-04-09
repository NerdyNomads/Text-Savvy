/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import './DeleteButton.css';

function DeleteButton({label, onClick}) {
  return (
    <div className="DeleteButton" onClick={onClick}>
        {label}
    </div>
  );
}

DeleteButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
  
export default DeleteButton;