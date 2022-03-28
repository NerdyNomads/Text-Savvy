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
  
  var currUserId;
  var workspaceLength = 0;
  var workspaceIds = [];
  var isLoggedIn = false;
  chrome.runtime.onMessageExternal.addListener(
    function(request) {
      // if there is no account logged in locally
      if (request.messageFromWeb.auth0Id === "") {
        isLoggedIn = false;
        workspaceIds = [];
        currUserId = "";
      }
      // else, there is an account/user logged in
      else {
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
                if (currUserId === account.auth0Id) {
                  helper.createWorkspaceContextMenus(workspaceIds, account);
                }
                // if current user is different from currently logged user
                else {
                  workspaceIds = [];
                  currUserId = account.auth0Id;
                  helper.createWorkspaceContextMenus(workspaceIds, account);
                }
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
