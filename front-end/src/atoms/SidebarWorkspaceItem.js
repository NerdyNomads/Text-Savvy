import React from "react";
import PropTypes from "prop-types";

import { EditIcon } from "../atoms/icons";
import {trimLongText} from "../util/util";
import "./SidebarWorkspaceItem.css";

const MAX_CHARACTER = 20;

function SidebarWorkspaceItem( {name, onEdit, onClickWorkspace} ) {

  const  formattedName = trimLongText(name ,MAX_CHARACTER);

  const handleEditWorkspaceClick = () => {
    onEdit(true);
  };

  const handleWorkspaceClick = () => {
    onClickWorkspace(true);
  };

  return (
    <div className="SidebarWorkspaceItem" onClick={handleWorkspaceClick}>
      <div className="SidebarWorkspaceItem-name">   
        {formattedName}
      </div>
      <div className="SidebarWorkspaceItem-edit" onClick={handleEditWorkspaceClick}> 
        <EditIcon/>
      </div>
    </div>
  );
}

SidebarWorkspaceItem.propTypes = {
  name: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onClickWorkspace: PropTypes.func.isRequired
};


export default SidebarWorkspaceItem;