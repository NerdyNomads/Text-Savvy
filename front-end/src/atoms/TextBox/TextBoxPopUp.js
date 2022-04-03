import React from "react";
import PropTypes from "prop-types";

import { trimLongText } from "../../util/util";
import { ChainIconSmallIcon, ExitIcon } from "../icons";

import "./TextBoxPopUp.css";

const MAX_CHAR_FOR_SOURCE_TO_SHOW = 50;

function TextBoxPopUp( {textItem, onChangeVisibility} ) {

  const handleBackgroundClick = (e) => {
    // clicked outside of modal
    if(e.target.className == "TextBoxPopUp-background") {
      onChangeVisibility(false);
    }
  };

  const handleExitClick = () => {
    onChangeVisibility(false);
  };

  const handleOnSourceClick = () => {
    var temp = document.createElement("textarea");
    temp.value = textItem.source;
    document.body.appendChild(temp);
    temp.select();
    navigator.clipboard.writeText(temp.value);
    document.body.removeChild(temp);

    var tooltip = document.getElementById("TextBoxPopUp-source-tooltip-text");
    tooltip.innerHTML = "Copied!";
  };

  const handleOnSourceHover = () => {
    var tooltip = document.getElementById("TextBoxPopUp-source-tooltip-text");
    tooltip.innerHTML = "Click to copy source";
  };

  return (
    <div className="TextBoxPopUp-background" onClick={handleBackgroundClick}>
      <div className="TextBoxPopUp">
        <div className="TextBoxPopUp-exit" onClick={handleExitClick}>
          <ExitIcon/>
        </div>
        <div className="TextBoxPopUp-source-tooltip">
          <div className="TextBoxPopUp-source" onClick={handleOnSourceClick} onMouseEnter={handleOnSourceHover}>
            <span id={"TextBoxPopUp-source-tooltip-text"} className="TextBoxPopUp-source-tooltip-text">Click to copy source</span>
            <ChainIconSmallIcon className="TextBoxPopUp-source-icon"/>
            <div className="TextBoxPopUp-source-text">{trimLongText(textItem.source, MAX_CHAR_FOR_SOURCE_TO_SHOW)}</div>
          </div>
        </div>
        <div className="TextBoxPopUp-text">
          {textItem.text}
        </div>
      </div>
    </div>
  );
}

TextBoxPopUp.propTypes = {
  textItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    creationDate: PropTypes.number.isRequired
  }),
  onChangeVisibility: PropTypes.func.isRequired,
};


export default TextBoxPopUp;