/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import TextBox from "../atoms/TextBox/TextBox";
import TextBoxAdd from "../atoms/TextBox/TextBoxAdd";
import "./TextList.css";

import axios from "axios";

function TextList({ textList, workspaceId }) {
  const [ textItems, setTextItems ] = useState(null);

  const handleSubmit = (newTextItem) => {
    let newTextItems = [newTextItem, ...textItems];
    setTextItems(newTextItems);
    updateWorkspace(newTextItems);
  };

  const handleDelete = (id) => {
    // delete item in JSON based on id
    const newTextItems = textItems.filter(text => id !== text._id);
    setTextItems(newTextItems);
    updateWorkspace(newTextItems);
  };

  const updateWorkspace = async (textItems) => {
    let textIds = textItems.map( textItem => textItem._id );
    await axios.patch(`${process.env.REACT_APP_BACKEND_SERVER}/workspaces/update/${workspaceId}`, {texts: textIds, updateDate: Date.now()});
  }

  useEffect(() => {
    setTextItems(textList);
  }, [textList]);

  const renderList = () => {
    return textItems && textItems.map( (text) => {
      return <TextBox key={text._id} textItem={text} onDelete = {(id) => handleDelete(id)}/>;
    });
  };

  return (
    <div className= "text-list">
      {<TextBoxAdd workspaceId={workspaceId} showInput={false} onSubmit = {(newText) => handleSubmit(newText)}/>}
      {renderList()}
    </div>
  );
}

TextList.propTypes = {
  textList: PropTypes.array.isRequired,
  workspaceId: PropTypes.string.isRequired
};

export default TextList;