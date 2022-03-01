import React from "react";

import { PaperPlaneIcon } from "./icons";

import "./TextBoxEdit.css";



function TextBoxEdit() {

  return (
    <div className="TextBoxEdit">
      <div className="text-box-edit-content">
        <div className="edit-label">
          <form action="/action_page.php">
            <textarea type="text" placeholder="Enter Text"/>
          </form>
        </div>
        <div className="text-box-edit-footer">
          <div className="send-icon">
            <PaperPlaneIcon/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextBoxEdit;