import React, { useState } from "react";
import PropTypes from "prop-types";

import { trimLongText } from "../../util/util";
import { ChainIcon, TrashCanIcon } from "../icons";
import { deleteText } from "../../util/requests";
import TextBoxPopUp from "./TextBoxPopUp";
import "./TextBox.css";


const MAX_CHARACTERS = 142;

function TextBox({textItem, onDelete}) {
  const [showTextPopUp, setShowTextPopUp] = useState(false);

  const handleDelete = async (id) => {
    await deleteText(id);
    onDelete(id);
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

  const handleCopyLink = () => {
    var temp = document.createElement("textarea");
    temp.value = textItem.source;
    document.body.appendChild(temp);
    temp.select();
    navigator.clipboard.writeText(temp.value);
    document.body.removeChild(temp);

    var tooltip = document.getElementById(textItem._id);
    tooltip.innerHTML = "Copied!";
  };

  const handleOnSourceHover = () => {
    var tooltip = document.getElementById(textItem._id);
    tooltip.innerHTML = "Click to copy source";
  };

  return (
    <>
      <div className="TextBox">
        <div className="text" onClick={() => setShowTextPopUp(true)}>
          {formatText(textItem.text)}
        </div>
        <div className="divider"/>
        <div className="card-footer">
          <div className="TextBox-source-tooltip">
            <div className="TextBox-source" onClick={handleCopyLink} onMouseEnter={handleOnSourceHover}>
              <span id={textItem._id} className="TextBox-source-tooltip-text"/>
              <ChainIcon className="TextBox-source-icon"/>
              <div className="TextBox-source-text">{trimLongText(textItem.source || "", 30)}</div>
            </div>
          </div>
          <div onClick={() => handleDelete(textItem._id)} className="delete">
            <TrashCanIcon/>
          </div>
        </div>
      </div>

      {/* Text Pop Up */}
      { showTextPopUp && <TextBoxPopUp onChangeVisibility={handleOnChangeVisibility} textItem={textItem}/>}
    </>
  );
}

TextBox.propTypes = {
  textItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired
};

export default TextBox;