/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import TextBox from "../atoms/TextBox/TextBox";
import TextBoxAdd from "../atoms/TextBox/TextBoxAdd";
import { updateWorkspace } from "../util/requests";
import "./TextList.css";


function TextList({ textList, workspaceId }) {
  const [ textItems, setTextItems ] = useState(null);

  const handleSubmit = (newTextItem) => {
    let newTextItems = [newTextItem, ...textItems];
    setTextItems(newTextItems);
    updateCurrentWorkspace(newTextItems);
  };

  const handleDelete = (id) => {
    // delete item in JSON based on id
    const newTextItems = textItems.filter(text => id !== text._id);
    setTextItems(newTextItems);
    updateCurrentWorkspace(newTextItems);
  };

  const updateCurrentWorkspace = async (item) => {
    let textIds = item.map( item => item._id );
    let updatedWorkspace = {
      texts: textIds,
      updateDate: Date.now()
    };
    await updateWorkspace(workspaceId, updatedWorkspace);
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