// importing objects
import { Workspace } from '../objects/objects.js';

const workspace = Object.create(Workspace);

window.onload=function()
{
    // Get the form element.
    var workspace_form = document.getElementById('workspace_form');

    // Add the submit event listener to the form.
    workspace_form.addEventListener('submit', workspace_submit);
}

function workspace_submit(event) 
{
    // Get the data from the form.
    // event.target represents the form that is being submitted.
    var formData = new FormData(event.target);

    var output = ""; 
    
    // Loop over each pair (name and value) in the form and add it to the values array.
    for (var pair of formData) {
        if (pair[0] == "workspace_name")
            workspace.name = pair[1];
    }

    workspace.owner = account.username;         // change to some getter function 

    output = "Name: " + workspace.name + " " +
            "Owner: " + workspace.owner + " " +
            "Public: " + workspace.is_public + " " +
            "Creation Date: " + workspace.workspace_create_date;
    
    document.getElementById("workspace_create").innerHTML = output;
    event.preventDefault();
}