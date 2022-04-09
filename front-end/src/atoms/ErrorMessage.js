import React from "react";
import PropTypes from "prop-types";

import "./ErrorMessage.css";

const ErrorMessage = ({message}) => (
  <span  id="ErrorMessage">{message}</span>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;