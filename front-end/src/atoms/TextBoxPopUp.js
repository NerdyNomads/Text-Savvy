import React from "react";
import PropTypes from "prop-types";

import { ChainIconSmallIcon, ExitIcon } from "./icons";

import "./TextBoxPopUp.css";

const MAX_CHAR_FOR_SOURCE_TO_SHOW = 50;

function TextBoxPopUp( {show, text, source} ) {

  const handleOnSourceClick = () => {
    alert("Temporary: Link Clicked");
  };

  const renderSource = (srcText) => {
    return srcText.substring(0, MAX_CHAR_FOR_SOURCE_TO_SHOW) + "...";
  };


  return (
    show &&
    <div className="TextBoxPopUp-background">
      <div className="TextBoxPopUp">
        <div className="TextBoxPopUp-exit">
          <ExitIcon/>
        </div>
        <div className="TextBoxPopUp-source" onClick={handleOnSourceClick}>
          <div className="TextBoxPopUp-source-icon">
            <ChainIconSmallIcon/>
          </div>
          <div className="TextBoxPopUp-source-text">
            <a className="TextBoxPopUp-source-text-a"href={source}>{renderSource(source)}</a>
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
  show: PropTypes.bool
};

TextBoxPopUp.defaultProps = {
  show: true
};

export default TextBoxPopUp;