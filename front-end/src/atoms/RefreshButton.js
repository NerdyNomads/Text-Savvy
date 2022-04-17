import React from "react";
import PropTypes from "prop-types";

import "./Button.css";
import "./RefreshButton.css";

const RefreshingButton = ({ child, onClick }) => (
  <div className="Button RefreshButton" onClick={onClick} type="submit">
    {child}
  </div>
);

RefreshingButton.propTypes = {
  onClick: PropTypes.func,
  child: PropTypes.object
};

export default RefreshingButton;
