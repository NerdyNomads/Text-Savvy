import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

import TextList from "../molecules/TextList";
import "./Dashboard.css";
import { getWorkspaceInfo, getWorkspaceTexts } from "../util/requests";
import RefreshingButton from "../atoms/RefreshButton";
import { ReloadIcon } from "../atoms/icons";

function Dashboard({ workspaceId }) {
  const [ textItems, setTextItems ] = useState(null);
  const [ renderedWorkspaceTitle, setRenderedWorkspaceTitle ] = useState("");

  const componentName = "Dashboard";

  const getCurrentWorkspace = async () => {
    if (workspaceId) {
      let workspaceResult = await getWorkspaceInfo(workspaceId);
      setRenderedWorkspaceTitle(workspaceResult?.data?.name);

      let textResult = await getWorkspaceTexts(workspaceId);
      setTextItems(textResult?.data);
    }
  };

  useEffect(() => {
    getCurrentWorkspace();
  }, [workspaceId]);

  const icon = (
    <div className={`${componentName}-title-reload`}>
      <div>Refresh</div>
      <ReloadIcon />
    </div>
  );

  return (
    <div className={`${componentName}`}>
      <div className={`${componentName}-title`}>
        {renderedWorkspaceTitle}
        <RefreshingButton child={icon} onClick={() => location.reload()} />
      </div>
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