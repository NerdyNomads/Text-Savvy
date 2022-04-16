import React from "react";
import PropTypes from "prop-types";

import { trimLongText } from "../../util/util";
import { ChainIconSmallIcon, ExitIcon } from "../icons";

import "./TextBoxPopUp.css";

const MAX_CHAR_FOR_SOURCE_TO_SHOW = 50;

function TextBoxPopUp( {textItem, onChangeVisibility} ) {

  const componentName = "TextBoxPopUp";

  const handleBackgroundClick = (e) => {
    // clicked outside of modal
    if(e.target.className == `${componentName}-background`) {
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

    var tooltip = document.getElementById(`${componentName}-source-tooltip-text`);
    tooltip.innerHTML = "Copied!";
  };

  const handleOnSourceHover = () => {
    var tooltip = document.getElementById(`${componentName}-source-tooltip-text`);
    tooltip.innerHTML = "Click to copy source";
  };

  return (
    <div className={`${componentName}-background`} onClick={handleBackgroundClick}>
      <div className={`${componentName}`}>
        <div className={`${componentName}-exit`} onClick={handleExitClick}>
          <ExitIcon/>
        </div>
        <div className={`${componentName}-source-tooltip`}>
          <div className={`${componentName}-source`} onClick={handleOnSourceClick} onMouseEnter={handleOnSourceHover}>
            <span id={`${componentName}-source-tooltip-text`} className={`${componentName}-source-tooltip-text`}>Click to copy source</span>
            <ChainIconSmallIcon className={`${componentName}-source-icon`}/>
            <div className={`${componentName}-source-text`}>{trimLongText(textItem.source, MAX_CHAR_FOR_SOURCE_TO_SHOW)}</div>
          </div>
        </div>
        <div className={`${componentName}-text`}>
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