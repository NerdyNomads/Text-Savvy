/*global chrome*/
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

  // Add all the workspaces as children
  fetch(`${serverAddr}/workspaces`)
    .then((r) => r.text())
    .then((result) => {
      // Result now contains the response text, do what you want...
      const workspaces = JSON.parse(result);
      workspaces.map((workspace) =>
        chrome.contextMenus.create({
          id: workspace._id,
          title: workspace.name,
          contexts: ["selection"],
          parentId: "parent",
        })
      );
    });

  // Handling when a menu Item is clicked
  //--------------------------------------------------------------

  // Add functionality when an item is clicked
  chrome.contextMenus.onClicked.addListener((clickData) => {
    fetch(`${serverAddr}/workspaces`)
      .then((r) => r.text())
      .then((result) => {
        // Result now contains the response text, do what you want...
        const workspaces = JSON.parse(result);
        var textData;
        textData = helper.workspaceIsClicked(clickData, workspaces);
        helper.updateWorkspaceToDb(textData, clickData);  
      });      
  });
  

} catch (e) {
  console.error(e);
}
