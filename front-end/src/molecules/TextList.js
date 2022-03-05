import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";

import TextBox from "../atoms/TextBox";
import TextBoxAdd from "../atoms/TextBoxAdd";
import "./TextList.css";

import axios from "axios";

function TextList() {
  const [ dataIsLoaded, setDataIsLoaded ] = useState(false);
  const [ textItems, setTextItems ] = useState(null);
  // const [ texts, setTexts ] = useState([]);

  const handleDelete = (id) => {
    // delete item in JSON based on id
    const newRenderedItem = textItems.filter(text => id !== text._id);
    setTextItems(newRenderedItem);
  };

  async function getTexts() {
    let result = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/texts`);
    return result?.data;
  }

  useEffect(async () => {
    let dbTexts = await getTexts();
    setDataIsLoaded(true);
    if (dataIsLoaded) {
      setTextItems(dbTexts);
    }
  }, [dataIsLoaded]);

  const renderList = () => {
    return textItems && textItems.map( (l) => {
      return <TextBox key={l._id} textItem={l} onDelete = {(id) => handleDelete(id)}/>;
    });
  };

  return (
    <div className= "text-list">
      {renderList()}
      {<TextBoxAdd showInput={false}/>}
    </div>
  );
}

// TextList.propTypes = {
//   list: PropTypes.array.isRequired
// };

export default TextList;