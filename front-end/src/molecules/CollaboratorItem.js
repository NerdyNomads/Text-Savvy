import React from "react";
import PropTypes from "prop-types";
import { TrashCanIcon } from "../atoms/icons";
import "./CollaboratorItem.css";

const CollaboratorItem = ({ text, remove, pending }) => {
  const style = pending
    ? {
      fontStyle: "italic",
      color: "#707070",
    }
    : {};

  return (
    <div className="CollaboratorItem">
      <span style={style} className="CollaboratorItem-email">
        {text}
      </span>
      <TrashCanIcon className="CollaboratorItem-remove" onClick={remove}/>
    </div>
  );
};

CollaboratorItem.propTypes = {
  text: PropTypes.string.isRequired,
  pending: PropTypes.bool,
  remove: PropTypes.func.isRequired
};

export default CollaboratorItem;
