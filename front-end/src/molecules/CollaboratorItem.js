import React from "react";
import PropTypes from "prop-types";
import { TrashCanIcon } from "../atoms/icons";
import "./CollaboratorItem.css";

const CollaboratorItem = ({ text, remove, pending }) => {

  return (
    <div className="CollaboratorItem">
      <span className={`CollaboratorItem-email ${pending ? "CollaboratorItem-pending" : "" }`} >
        {pending ? text + "*" : text }
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
