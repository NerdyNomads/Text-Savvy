// importing objects
import { Account } from '../persistence/models/accounts.model.js';

const account = new Account;

// window.onload=function()
// {
//     // Get the form element.
//     var account_form = document.getElementById('account_form');

//     // Add the submit event listener to the form.
//     account_form.addEventListener('submit', account_submit);
// }

function accountSubmit(event) 
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

    console.log(output);

    event.preventDefault();
}
