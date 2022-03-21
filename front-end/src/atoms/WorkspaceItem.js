import React from "react";
import PropTypes from "prop-types";

import { EditIcon } from "../atoms/icons";
import {trimLongText} from "../util/util";
import "./WorkspaceItem.css";

const MAX_CHARACTER = 15;

function WorkspaceItem( {name} ) {

  const  formattedName = trimLongText(name ,MAX_CHARACTER);

  const handleEditWorkspaceClick = () => {
    console.log("clicked edit workspace.");
  };

  return (
      
    <div className="WorkspaceItem">
      <div className="WorkspaceItem-name">   
        {formattedName}
      </div>
      <div className="WorkspaceItem-edit" onClick={handleEditWorkspaceClick}> 
        <EditIcon/>
      </div>
    </div>

   
  );
}

WorkspaceItem.propTypes = {
  name: PropTypes.string.isRequired
};


export default WorkspaceItem;