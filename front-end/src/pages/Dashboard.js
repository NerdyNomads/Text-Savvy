import React, {useState, useEffect} from "react";

import axios from "axios";

import TextList from "../molecules/TextList";
import "./Dashboard.css";

function Dashboard() {
  const [ textItems, setTextItems ] = useState(null);

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
    <div className="Dashboard">
      { textItems &&
          <TextList list={textItems}/>
      }
    </div>
  );
}


export default Dashboard;