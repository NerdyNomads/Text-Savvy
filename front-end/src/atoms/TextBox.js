import React from "react";
import PropTypes from "prop-types";

import { ChainIcon, TrashCanIcon } from "./icons";
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

  const handleCopyLink = () => {
    const temp = document.createElement("textarea");
    temp.value = source;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);

    alert(`Link copied: ${source}`);

    text = document.getElementById("link");
    if (text.childElementCount == 0) {
      temp.className = "textarea";
      text.appendChild(temp);
    }
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
        <div className="source" target="_blank" rel="noreferrer" onClick={handleCopyLink}>
          <ChainIcon />
        </div>
        <div id="link">
        </div>
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