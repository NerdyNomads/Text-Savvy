import React from "react";
import PropTypes from "prop-types";

import "./ErrorMessage.css";

const ErrorMessage = ({className, message}) => (
  <span className={`ErrorMessage ${className}`}>{message}</span>
);

ErrorMessage.propTypes = {
  className: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default ErrorMessage;