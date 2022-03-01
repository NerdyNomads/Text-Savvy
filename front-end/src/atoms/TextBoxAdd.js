import React from "react";
import "./TextBoxAdd.css";
import { AddIcon } from "./icons";



function TextBoxAdd() {

  const handleAddCardClick = () => {
    alert("Temporary: Add text ");
  };


  return (
    <div className="TextBoxAdd" onClick={handleAddCardClick}>
      <div className="text-box-add-content">
        <div className="add-icon">
          <AddIcon/>
        </div>
        <div className="add-label">Add Text</div>
      </div>
    </div>
  );
}

export default TextBoxAdd;