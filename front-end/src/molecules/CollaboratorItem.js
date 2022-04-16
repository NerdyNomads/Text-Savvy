import React from "react";
import PropTypes from "prop-types";

import { TrashCanIcon } from "../atoms/icons";
import "./CollaboratorItem.css";

const CollaboratorItem = ({ email, onRemove, pending }) => {

  const handleRemoveCollaborator = () => {
    onRemove(email);
  };

  return (
    <div className="CollaboratorItem">
      <span className={`CollaboratorItem-email ${pending ? "CollaboratorItem-pending" : "" }`} >
        {pending ? email + "*" : email }
      </span>
      <TrashCanIcon className="CollaboratorItem-remove" onClick={handleRemoveCollaborator}/>
    </div>
  );
};

CollaboratorItem.propTypes = {
  email: PropTypes.string.isRequired,
  pending: PropTypes.bool,
  onRemove: PropTypes.func.isRequired
};

export default CollaboratorItem;
