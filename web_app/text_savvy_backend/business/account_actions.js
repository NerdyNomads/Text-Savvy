// importing objects
import { Account } from '../objects/objects.js';

const account = Object.create(Account);

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