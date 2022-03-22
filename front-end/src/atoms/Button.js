/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import './Button.css';

function Button({label}) {

  return (
    <div className="Button">
        {label}
    </div>
  );
}

Button.propTypes = {
    label: PropTypes.string.isRequired
  };
  

export default Button;