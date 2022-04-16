import React, { useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import { AddIcon, ExitIcon, ChainIcon, SaveIcon } from "../icons";
import "./TextBoxAdd.css";
import "./TextBoxEdit.css";

function TextBoxAdd({ workspaceId, onSubmit }) {

  const [edit, setEdit] = useState(false);
  const [textAreaVal, setTextAreaVal] = useState("");
  const [sourceFieldVal, setSourceFieldVal] = useState("");

  let editCard;
  let addSign;

  const handleOnTextCancel = () => {
    resetValues();
  };

  const resetValues = () => {
    setTextAreaVal("");
    setSourceFieldVal("");
    setEdit(false);
  };

  const handleAddCardClick = () => {
    setEdit(true);
  };

  const handleOnTextSubmit = async () => {
    const text = {
      text: textAreaVal,
      source: sourceFieldVal,
      workspaceID: workspaceId,
      creationDate: Date.now(),
      updateDate: null,
      deleteDate: null
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVER}/texts/add`, text)
      .then((result) => {
        onSubmit(result.data);
      });

    setTimeout(() => {
      resetValues();
    }, 130);
  };

  editCard = <div className="TextBoxEdit">
    <div className="edit-header" onClick={handleOnTextCancel}>
      <div className="delete-icon">
        <ExitIcon/>
      </div>
    </div>
    <div className="edit-body">
      <textarea 
        className="text-area" 
        type="text" 
        placeholder="Enter text..."
        value={textAreaVal}
        onChange={
          (event) => {
            setTextAreaVal(() =>
              event.target.value
            );
          }
        }/>
    </div>
    <div className="divider"/>
    <div className="edit-footer">
      <div className="source" target="_blank" rel="noreferrer">
        <ChainIcon />
      </div>
      <div id="source">
        <input 
          className="source-field" 
          type="text" 
          value={sourceFieldVal}
          onChange={
            (event) => {
              setSourceFieldVal(() =>
                event.target.value
              );
            }
          }/>        
      </div>
      <div className="send-icon" onClick={handleOnTextSubmit}>
        <SaveIcon/>
      </div>
    </div>
  </div>;

  addSign = <div className="TextBoxAdd" onClick={handleAddCardClick}>
    <div className="text-box-add-content">
      <div className="add-icon">
        <AddIcon/>
      </div>
      <div className="add-label">Add Text</div>
    </div>
  </div>;

  return (
    <>{ edit ? editCard : addSign}</>
  );
}

TextBoxAdd.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  workspaceId: PropTypes.string.isRequired
};

export default TextBoxAdd;