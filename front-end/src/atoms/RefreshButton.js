import React from "react";
import PropTypes from "prop-types";

import "./Button.css";
import "./RefreshButton.css";

const RefreshButton = ({ child, onClick }) => (
  <div className="Button RefreshButton" onClick={onClick} type="submit">
    {child}
  </div>
);

RefreshButton.propTypes = {
  onClick: PropTypes.func,
  child: PropTypes.object
};

export default RefreshButton;
