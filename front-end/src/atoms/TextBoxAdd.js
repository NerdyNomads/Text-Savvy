import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// import axios from "axios";

import { AddIcon, PaperPlaneIcon, DeleteIcon } from "./icons";
import "./TextBoxAdd.css";
import "./TextBoxEdit.css";


function TextBoxAdd({showInput}) {

  const [cardRender, setCardRender] = useState();
  const [textAreaVal, setTextAreaVal] = useState();

  let editCard;
  let addSign;


  const handleOnTextCancel = () => {
    setCardRender(addSign);
  };

  const handleOnTextSubmit = (text) => {

    console.log(text);

    // const text = {
    //   text: e.,
    //   source: clickData.pageUrl,
    //   creationDate: new Date(),
    // };

    // axios
    //   .post(`${process.env.REACT_APP_BACKEND_SERVER}/texts/add`, "")
    //   .then((res) => console.log(res.data));
  };

  useEffect(() => {
    console.log(textAreaVal);
  }, [textAreaVal]);


  editCard= <div className="TextBoxEdit">
    <div className="edit-header" onClick={handleOnTextCancel}>
      <div className="delete-icon">
        <DeleteIcon/>
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
    <div className="edit-footer">
      <div className="send-icon" onClick={handleOnTextSubmit(textAreaVal)}>
        <PaperPlaneIcon/>
      </div>
    </div>

  </div>;

  const handleAddCardClick = () => {
    setCardRender(editCard);
  };

  addSign = <div className="TextBoxAdd" onClick={handleAddCardClick}>
    <div className="text-box-add-content">
      <div className="add-icon">
        <AddIcon/>
      </div>
      <div className="add-label">Add Text</div>
    </div>
  </div>;

  useEffect(() => {
    if (showInput) {
      setCardRender(editCard);
    } else {
      setCardRender(addSign);
    }
  }, [showInput]);

 


  return (
    <>{cardRender}</>
  );
}

TextBoxAdd.propTypes = {
  showInput: PropTypes.bool.isRequired,

};

export default TextBoxAdd;