import React from "react";
import PropTypes from "prop-types";
import { TrashCanIcon } from "../atoms/icons";

import "./CollaboratorItem.css";

const CollaboratorItem = ({ text, pending }) => {
  const style = pending
    ? {
      fontStyle: "italic",
      color: "#707070",
    }
    : {};

  const clickHandler = () => {
    console.log("Trash icon was clicked");
  };

  return (
    <div className="CollaboratorItem">
      <span style={style} className="CollaboratorItem-email">
        {text}
      </span>
      <TrashCanIcon className="CollaboratorItem-remove" onClick={clickHandler}/>
    </div>
  );
};

CollaboratorItem.propTypes = {
  text: PropTypes.string.isRequired,
  pending: PropTypes.bool,
};

export default CollaboratorItem;
