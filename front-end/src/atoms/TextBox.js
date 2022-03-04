import React, { useState } from "react";
import PropTypes from "prop-types";

import { ChainIcon, TrashCanIcon } from "./icons";
import TextBoxPopUp from "./TextBoxPopUp";
import "./TextBox.css";

import axios from "axios";


const MAX_CHARACTERS = 142;


function TextBox({textItem}) {
  const [ texts, setTexts ] = useState([]);
  const [showTextPopUp, setShowTextPopUp] = useState(false);

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}/texts/${id}`).then(() => {
      const del = texts.filter(text => id !== text._id);
      setTexts(del);
    });
    alert(`Deleted text with ID: ${textItem._id}`);
  };


  const formatText = (t) => {
    if (t.length > MAX_CHARACTERS) {
      t = t.slice(0, MAX_CHARACTERS-4);
      t = `"${t}..."`;
    }
    return t;
  };

  const handleOnChangeVisibility = (visible) => {
    setShowTextPopUp(visible);
  };

  return (
    <>
      <div className="TextBox">
        <div className="text" onClick={() => setShowTextPopUp(true)}>
          {formatText(textItem.text)}
        </div>
        <div className="divider"/>
        <div className="card-footer">
          <a href={textItem.source} className="source" target="_blank" rel="noreferrer" >
            <ChainIcon />
          </a>
          <div onClick={() => handleDelete(textItem._id)} className="delete">
            <TrashCanIcon/>
          </div>
        </div>
      </div>

      {/* Text Pop Up */}
      { showTextPopUp && <TextBoxPopUp onChangeVisibility={handleOnChangeVisibility} text={textItem.text} source={textItem.source}/>}
    </>
  );
}

TextBox.propTypes = {
  textItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    creationDate: PropTypes.number.isRequired
  })
};

export default TextBox;