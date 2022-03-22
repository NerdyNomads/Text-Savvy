import React from "react";

import { ExitIcon } from "../atoms/icons";
import "./Sidebar.css";


function WorkspaceSettings() {
  const componentName = "WorkspaceSettings";
  return (
    <div className={`${componentName}`}>
      <ExitIcon/>
      <div className={`${componentName}-header`}>
        {/* editable workspace name */}
      </div>
      <div className={`${componentName}-body`}>
        {/* collab list stuff */}
      </div>
      <div className={`${componentName}-footer`}>
        {/* Save Button */}
      </div>
    </div>
  );

}

export default WorkspaceSettings;