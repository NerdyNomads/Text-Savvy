import React from "react";
import PropTypes from "prop-types";

import { ChainIconSmallIcon, ExitIcon } from "../icons";

import "./TextBoxPopUp.css";

const MAX_CHAR_FOR_SOURCE_TO_SHOW = 50;

function TextBoxPopUp( {text, source, onChangeVisibility} ) {

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
    alert(`Link copied: ${source}`);

    //Create a temporary element to be able to copy the source
    var temp = document.createElement("textarea");
    temp.value = source;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  };

  const renderSource = (srcText) => {
    return srcText.substring(0, MAX_CHAR_FOR_SOURCE_TO_SHOW) + "...";
  };

  return (
    <div className="TextBoxPopUp-background" onClick={handleBackgroundClick}>
      <div className="TextBoxPopUp">
        <div className="TextBoxPopUp-exit" onClick={handleExitClick}>
          <ExitIcon/>
        </div>
        <div className="TextBoxPopUp-source" onClick={handleOnSourceClick}>
          <div className="TextBoxPopUp-source-icon">
            <ChainIconSmallIcon/>
          </div>
          <div className="TextBoxPopUp-source-text">
            <a className="TextBoxPopUp-source-text-a">{renderSource(source)}</a>
          </div>
        </div>
        <div className="TextBoxPopUp-text">
          {text}
        </div>
      </div>
    </div>
  );
}

TextBoxPopUp.propTypes = {
  text: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  onChangeVisibility: PropTypes.func.isRequired,
};


export default TextBoxPopUp;