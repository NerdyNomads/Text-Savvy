import React from "react";
import TextBox from "./TextBox";
class TextList extends React.Component {
    render() {
        return (
            <div className= "text-list">
            <b>You are currently viewing: Quotes</b>
            <TextBox/>
            <TextBox/>
            </div>
        )
    }
}

export default TextList;