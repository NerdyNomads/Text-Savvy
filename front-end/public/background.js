/* global chrome */
import * as helper from "./helper.js";

try {
  // Context menu items
  //--------------------------------------------------------------

  const parentContextMenuItem = {
    id: "parent",
    title: "Add to Workspace",
    contexts: ["selection"]
  };
  
  // Adding and removing the items
  //--------------------------------------------------------------
  
  // Make sure any other instance of our menus are removed first
  chrome.contextMenus.removeAll();
  
  chrome.contextMenus.create(parentContextMenuItem);
  
  var workspaceLength = 0;
  var workspaceIds = [];
  var isLoggedIn = false;
  chrome.runtime.onMessageExternal.addListener(
    function(request) {
      // Make sure any other instance of our menus are removed first
      chrome.contextMenus.removeAll();
      chrome.contextMenus.create(parentContextMenuItem);
      // if there is no account logged in locally
      if (request.messageFromWeb.auth0Id === "") {
        isLoggedIn = false;
        workspaceIds = [];
      }
      // else, there is an account/user logged in
      else {
        var totalWorkspaces;
        fetch(`${helper.serverAddr}/accounts`)
          .then((r) => r.text())
          .then((accountResult) => {
            // Result now contains the response text, do what you want...
            const accounts = JSON.parse(accountResult);
            accounts.map((account) => {
              // if user is currently logged in
              if (request.messageFromWeb.auth0Id === account.auth0Id) {
                isLoggedIn = true;
                workspaceLength = account.workspaces.length;
                workspaceIds = [];
                totalWorkspaces = account.workspaces;
                fetch(`${helper.serverAddr}/workspaces/byCollaborator/${account.email}`)
                  .then((r) => r.text())
                  .then((workspacesResult) => {
                    const workspaces = JSON.parse(workspacesResult);
                    workspaces.map((workspace) => {
                      if (totalWorkspaces.indexOf(workspace._id) === -1)
                        totalWorkspaces.push(workspace._id);
                    });
                    helper.createWorkspaceContextMenus(workspaceIds, totalWorkspaces);
                  });
              }
            });
          });
      }
    }
  );

  

  // Handling when a menu Item is clicked
  //--------------------------------------------------------------

  // Add functionality when an item is clicked
  chrome.contextMenus.onClicked.addListener((clickData) => {
    if ((isLoggedIn) && (workspaceLength > 0)) {
      fetch(`${helper.serverAddr}/workspaces`)
        .then((r) => r.text())
        .then((result) => {
          // Result now contains the response text, do what you want...
          const workspaces = JSON.parse(result);
          helper.workspaceIsClicked(clickData, workspaces);
        });
    }
    else {
      chrome.contextMenus.removeAll();
      chrome.contextMenus.create(parentContextMenuItem);
      chrome.tabs.create({ url: "http://localhost:3000" });      
    }
  });
} catch (e) {
  console.error(e);
}
