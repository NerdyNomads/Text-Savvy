/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import './Button.css';

function Button({label, onClick}) {
  return (
    <div className="Button" onClick={onClick}>
        {label}
    </div>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
  
export default Button;