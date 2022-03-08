/* eslint-disable */
import React, { useState, useEffect } from "react";

import TextBox from "../atoms/TextBox";
import TextBoxAdd from "../atoms/TextBoxAdd";
import "./TextList.css";

import axios from "axios";

function TextList() {
  const [ dataIsLoaded, setDataIsLoaded ] = useState(false);
  const [ textItems, setTextItems ] = useState(null);

  const handleSubmit = async () => {
    let newTextItems = await getTexts();
    setTextItems(newTextItems);
  };
  
  const handleDelete = (id) => {
    // delete item in JSON based on id
    const newRenderedItem = textItems.filter(text => id !== text._id);
    setTextItems(newRenderedItem);
  };

  async function getTexts() {
    let result = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/texts`);
    return result?.data;
  }

  useEffect(async () => {
    let abortController = new AbortController();
    let dbTexts = await getTexts();
    setDataIsLoaded(true);
    if (dataIsLoaded) {
      setTextItems(dbTexts);
    }
    return () => {  
      abortController.abort();  
    } 
  }, [dataIsLoaded]);

  const renderList = () => {
    return textItems && textItems.map( (text) => {
      return <TextBox key={text._id} textItem={text} onDelete = {(id) => handleDelete(id)}/>;
    });
  };

  return (
    <div className= "text-list">
      {<TextBoxAdd showInput={false} onSubmit = {() => handleSubmit()}/>}
      {renderList()}
    </div>
  );
}

export default TextList;