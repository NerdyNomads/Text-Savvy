import React from "react";
import PropTypes from "prop-types";

import TextBox from "../atoms/TextBox";
import TextBoxAdd from "../atoms/TextBoxAdd";
import "./TextList.css";

function TextList( {list} ) {

  const renderList = () => {
    return list.map( (l) => {
      return <TextBox key={l._id} textItem={l}/>;
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