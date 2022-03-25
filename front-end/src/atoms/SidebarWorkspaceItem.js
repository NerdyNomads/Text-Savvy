import React from "react";
import PropTypes from "prop-types";

import { EditIcon } from "../atoms/icons";
import {trimLongText} from "../util/util";
import "./SidebarWorkspaceItem.css";

const MAX_CHARACTER = 20;

function SidebarWorkspaceItem( {name, onEdit, selected, onClickWorkspace} ) {

  const  formattedName = trimLongText(name ,MAX_CHARACTER);

  const componentName = "SidebarWorkspaceItem";

  const handleEditWorkspaceClick = () => onEdit(true);
  

  const handleWorkspaceClick = () => onClickWorkspace(true);


  return (
    <div className={`${componentName} ${selected ? `${componentName}-selected` : "" }`} onClick={handleWorkspaceClick}>
      <div className={`${componentName}-name`}>   
        {formattedName}
      </div>
      <div className={`${componentName}-edit`} onClick={handleEditWorkspaceClick}> 
        <EditIcon/>
      </div>
    </div>
  );
}

SidebarWorkspaceItem.propTypes = {
  name: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onClickWorkspace: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};


export default SidebarWorkspaceItem;