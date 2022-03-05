import React, { useState } from "react";

import axios from "axios";

import { AddIcon, PaperPlaneIcon, ExitIcon, ChainIcon } from "./icons";
import "./TextBoxAdd.css";
import "./TextBoxEdit.css";


function TextBoxAdd() {

  const [edit, setEdit] = useState(false);
  const [textAreaVal, setTextAreaVal] = useState();

  let editCard;
  let addSign;


  const handleOnTextCancel = () => {
    setTextAreaVal("");
    setEdit(false);
  };
  const handleAddCardClick = () => {
    setEdit(true);
  };

  const handleOnTextSubmit = () => {

    const text = {
      text: textAreaVal,
      source: "https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwjWisuI0qX2AhWpJjQIHbKHBJoQPAgI",
      creationDate: Date.now(),
      updateDate: null,
      deleteDate: null
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVER}/texts/add`, text)
      .then((res) => console.log(res.data));
  };

  const handleAddLink = () => {
    var textfield = document.getElementById("test1");
    if (textfield.childElementCount == 0) { //Show the textfield 
      var temp = document.createElement("input");
      temp.className = "source-field";
      textfield.appendChild(temp);
    }
  };

  editCard= <div className="TextBoxEdit">
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
        value = {textAreaVal}
        onChange={
          (event)=>{
            console.log(event.target.value);
            setTextAreaVal(() =>
              event.target.value
            );
          }
        }/>
    </div>
    <div className="divider"/>
    <div className="edit-footer">
      <div className="source" target="_blank" rel="noreferrer" onClick={handleAddLink}>
        <ChainIcon />
      </div>
      <div id="test1">        
      </div>
      <div className="send-icon" onClick={handleOnTextSubmit}>
        <PaperPlaneIcon/>
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

export default TextBoxAdd;