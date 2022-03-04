import React from "react";
import PropTypes from "prop-types";

import TextBox from "../atoms/TextBox";
import TextBoxAdd from "../atoms/TextBoxAdd";
import "./TextList.css";

function TextList( {list} ) {

  const renderList = () => {
    return list.map( (l) => {
      return <TextBox key={l.id} text={l.text} source={l.source} id={l.id} />;
    });
  };

  return (
    <div className= "text-list">
      {renderList()}
      {<TextBoxAdd showInput={false}/>}
    </div>
  );
}

TextList.propTypes = {
  list: PropTypes.array.isRequired
};

export default TextList;