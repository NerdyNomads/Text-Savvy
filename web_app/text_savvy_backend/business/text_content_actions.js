// importing objects
import { Text_Content } from '../objects/objects.js';

const text_content = Object.create(Text_Content);

window.onload=function()
{
    // Get the form element.
    var text_form = document.getElementById('text_form');

    // Add the submit event listener to the form.
    text_form.addEventListener('submit', text_submit);
}

function text_submit(event) 
{
    // Get the data from the form.
    // event.target represents the form that is being submitted.
    var formData = new FormData(event.target);

    var output = ""; 
    
    // Loop over each pair (name and value) in the form and add it to the values array.
    for (var pair of formData) {
        if (pair[0] == "text_content_name")
            text_content.name = pair[1];
        else if (pair[0] == "text_value")
            text_content.text = pair[1];
        else if (pair[0] == "source")
            text_content.source = pair[1];
    }

    workspace.text_content_list.push(text_content);         // change to some setter function

    output = "Name: " + text_content.name + " " +
            "Text: " + text_content.text + " " +
            "Source: " + text_content.source + " " +
            "Creation Date: " + text_content.text_create_date;
    
    document.getElementById("text_create").innerHTML = output;
    event.preventDefault();
}