/* global chrome */
/* eslint-disable */
import * as helper from "./helper.js";

try {
  const serverAddr = "http://localhost:5000";

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
  var workspaceIds = [];
  var isLogged = false;
  chrome.runtime.onMessageExternal.addListener(
    function(request) {
      console.log(request.messageFromWeb.auth0Id);
      if (request.messageFromWeb.auth0Id === "") {
        isLogged = false;
        workspaceIds = [];
        currUserId = "";
        chrome.contextMenus.removeAll();
        chrome.contextMenus.create(parentContextMenuItem);
      }
      else {
        fetch(`${serverAddr}/accounts`)
          .then((r) => r.text())
          .then((account_result) => {
            // Result now contains the response text, do what you want...
            const accounts = JSON.parse(account_result);
            accounts.map((account) => {
              // if user is currently logged in
              if (request.messageFromWeb.auth0Id === account.auth0Id) {
                isLogged = true;
                if (currUserId === account.auth0Id) {
                  // Add all the workspaces as children
                  fetch(`${serverAddr}/workspaces`)
                    .then((r) => r.text())
                    .then((workspace_result) => {
                      // Result now contains the response text, do what you want...
                      const workspaces = JSON.parse(workspace_result);
                      workspaces.map((workspace) => {
                        if (workspaceIds.indexOf(workspace._id) === -1) {
                          workspaceIds.push(workspace._id);
                          chrome.contextMenus.create({
                            id: workspace._id,
                            title: workspace.name,
                            contexts: ["selection"],
                            parentId: "parent",
                          })
                        }
                        else {
                          console.log("Context menu(s) already exist.");
                        }
                      });
                    });
                }
                // if current user is different from currently logged user
                else {
                  workspaceIds = [];
                  currUserId = account.auth0Id;
                  // Add all the workspaces as children
                  fetch(`${serverAddr}/workspaces`)
                    .then((r) => r.text())
                    .then((workspace_result) => {
                      // Result now contains the response text, do what you want...
                      const workspaces = JSON.parse(workspace_result);
                      workspaces.map((workspace) => {
                        workspaceIds.push(workspace._id);
                        chrome.contextMenus.create({
                          id: workspace._id,
                          title: workspace.name,
                          contexts: ["selection"],
                          parentId: "parent",
                        })
                      });
                    });
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
    if (isLogged) {
      fetch(`${serverAddr}/workspaces`)
        .then((r) => r.text())
        .then((result) => {
          // Result now contains the response text, do what you want...
          const workspaces = JSON.parse(result);
          helper.workspaceIsClicked(clickData, workspaces);
        });
    }
    else {
      chrome.tabs.create({ url: "http://localhost:3000" });      
    }
  });
} catch (e) {
  console.error(e);
}
