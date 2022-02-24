// importing objects
import { Account, Workspace, Text_Content } from '../objects/objects.js';

const account = Object.create(Account);
const workspace = Object.create(Workspace);
const text_content = Object.create(Text_Content);

window.onload=function()
{
    // Get the form element.
    var account_form = document.getElementById('account_form');
    var workspace_form = document.getElementById('workspace_form');
    var text_form = document.getElementById('text_form');

    // Add the submit event listener to the form.
    account_form.addEventListener('submit', account_submit);
    workspace_form.addEventListener('submit', workspace_submit);
    text_form.addEventListener('submit', text_submit);
}

function account_submit(event) 
{
    // Get the data from the form.
    // event.target represents the form that is being submitted.
    var formData = new FormData(event.target);

    var output = ""; 
    
    // Loop over each pair (name and value) in the form and add it to the values array.
    for (var pair of formData) {
        if (pair[0] == "email")
            account.email = pair[1];
        else if (pair[0] == "username")
            account.username = pair[1];
        else if (pair[0] == "password")
            account.password = pair[1];
    }
    output = "Email: " + account.email + " " +
            "Username: " + account.username + " " +
            "Password: " + account.password;
    
    document.getElementById("account_create").innerHTML = output;
    event.preventDefault();
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

    workspace.owner = account.username;

    output = "Name: " + workspace.name + " " +
            "Owner: " + workspace.owner + " " +
            "Public: " + workspace.is_public + " " +
            "Creation Date: " + workspace.workspace_create_date;
    
    document.getElementById("workspace_create").innerHTML = output;
    event.preventDefault();
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

    workspace.text_content_list.push(text_content);

    output = "Name: " + text_content.name + " " +
            "Text: " + text_content.text + " " +
            "Source: " + text_content.source + " " +
            "Creation Date: " + text_content.text_create_date;
    
    document.getElementById("text_create").innerHTML = output;
    event.preventDefault();
}