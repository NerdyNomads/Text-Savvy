// importing objects
import { Text } from '../persistence/models/texts.model';

const text = new Text;

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
        if (pair[0] == "text_name")
            text.name = pair[1];
        else if (pair[0] == "text_value")
            text.text = pair[1];
        else if (pair[0] == "source")
            text.source = pair[1];
    }

    // workspace.text_list.push(text);         // change to some setter function

    output = "Name: " + text.name + " " +
            "Text: " + text.text + " " +
            "Source: " + text.source + " " +
            "Creation Date: " + text.creationDate;
    
    document.getElementById("text_create").innerHTML = output;
    event.preventDefault();
}