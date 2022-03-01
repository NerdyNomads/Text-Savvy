import React from "react";
import PropTypes from "prop-types";

import { ChainIcon } from "./icons";
import { TrashCanIcon } from "./icons";

import "./TextBox.css";


const MAX_CHARACTERS = 142;


function TextBox({text, source}) {

  const formatText = (t) => {
    if (t.length > MAX_CHARACTERS) {
      t = t.slice(0, MAX_CHARACTERS-4);
      t = `"${t}..."`;
    }

    return t;
  };

  const handleCardClick = () => {
    alert(`Temporary: ${text}`);
  };


  const handleDelete = () => {
    alert("Temporary: delete");
  };


  return (
    <div className="TextBox">
      <div className="text" onClick={handleCardClick}>
        {formatText(text)}
      </div>
      <div className="divider"/>
      <div className="card-footer">
        <a href={source} className="source" target="_blank" rel="noreferrer" >
          <ChainIcon />
        </a>
        <div onClick={handleDelete} className="delete">
          <TrashCanIcon/>
        </div>
      </div>
    </div>
  );
}

TextBox.propTypes = {
  text: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired

};

export default TextBox;