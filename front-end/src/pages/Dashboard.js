import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

import TextList from "../molecules/TextList";
import "./Dashboard.css";
import { getWorkspaceInfo, getWorkspaceText } from "../util/requests";

function Dashboard({ workspaceId }) {
  const [ textItems, setTextItems ] = useState(null);
  const [ renderedWorkspaceTitle, setRenderedWorkspaceTitle ] = useState("");

  const componentName = "Dashboard";

  const getCurrentWorkspace = async () => {
    if (workspaceId) {
      let workspaceResult = await getWorkspaceInfo(workspaceId);
      setRenderedWorkspaceTitle(workspaceResult?.data.name);

      let textResult = await getWorkspaceText(workspaceId);
      setTextItems(textResult?.data);
    }
  };

  useEffect(() => {
    getCurrentWorkspace(workspaceId);
  }, [workspaceId]);

  return (
    <div className={`${componentName}`}>
      <div className={`${componentName}-title`}>{renderedWorkspaceTitle}</div>
      { textItems &&
          <TextList textList={textItems} workspaceId={workspaceId}/>
      }
    </div>
  );
}

Dashboard.propTypes = {
  workspaceId: PropTypes.string.isRequired,
};

export default Dashboard;