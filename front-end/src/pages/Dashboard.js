import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

import axios from "axios";

import TextList from "../molecules/TextList";
import "./Dashboard.css";

function Dashboard({ workspaceId }) {
  const [ textItems, setTextItems ] = useState(null);
  const [ renderedWorkspaceTitle, setRenderedWorkspaceTitle ] = useState("");

  const componentName = "Dashboard";

  const getCurrentWorkspace = () => {
    // FETCH CURRENT WORKSPACE based on id


    const fakeWorkspace = {
      id: "1",
      name: "My Workspace"
    };

    setRenderedWorkspaceTitle(fakeWorkspace.name);
  };

  useEffect(() => {

    getCurrentWorkspace(workspaceId);

  }, []);

  /**
   * Grabs data from the db.
   * 
   * @returns 				returns data from the db. 
   */
  async function getTexts() {
    let result = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/texts`);
    return result?.data;
  }

  useEffect(async () => {
    let texts = await getTexts();

    if (texts) {
      setTextItems(texts);
    }
  }, []);

  return (
    <div className={`${componentName}`}>
      <div className={`${componentName}-title`}>{renderedWorkspaceTitle}</div>
      { textItems &&
          <TextList list={textItems}/>
      }
    </div>
  );
}
Dashboard.propTypes = {
  workspaceId: PropTypes.string.isRequired,
};


export default Dashboard;