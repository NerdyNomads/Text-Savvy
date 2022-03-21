import React from "react";
import PropTypes from "prop-types";

import { EditIcon } from "./icons";
import {trimLongText} from "../util/util";
import "./SidebarWorkspaceItem.css";

const MAX_CHARACTER = 15;

function SidebarWorkspaceItem( {name} ) {

  const  formattedName = trimLongText(name ,MAX_CHARACTER);

  const handleEditWorkspaceClick = () => {
    console.log("clicked edit workspace.");
  };

  return (
      
    <div className="SidebarWorkspaceItem">
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
  name: PropTypes.string.isRequired
};


export default SidebarWorkspaceItem;