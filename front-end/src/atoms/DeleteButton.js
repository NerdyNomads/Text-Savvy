/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import './DeleteButton.css';

function DeleteButton({label}) {

  return (
    <div className="DeleteButton">
        {label}
    </div>
  );
}

DeleteButton.propTypes = {
    label: PropTypes.string.isRequired
};
  

export default DeleteButton;