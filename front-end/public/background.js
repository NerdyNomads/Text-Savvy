/*global chrome*/


import { workspaces, formatText, workspaceExists, createNotification, saveTextToDb } from "./helper";

try {
  const serverAddr = "http://localhost:5000";

  // Context menu items
  //--------------------------------------------------------------

  const parentContextMenuItem = {
    id: "parent",
    title: "Add to workspace",
    contexts: ["selection"],
  };



  fetch(`${serverAddr}/accounts`)
    .then((r) => r.text())
    .then((result) => {
    // Result now contains the response text, do what you want...
      console.log("The fetch has been made. " + "The result is: " + result.JSON);
    });


  // Adding and removing the items
  //--------------------------------------------------------------

  // Make sure any other instance of our menus are removed first
  chrome.contextMenus.removeAll();

  chrome.contextMenus.create(parentContextMenuItem);

  // Add all the workspaces as children
  workspaces.map(({ id, name }) =>
    chrome.contextMenus.create({
      id,
      title: name,
      contexts: ["selection"],
      parentId: "parent",
    })
  );

  // Handling when a menu Item is clicked
  //--------------------------------------------------------------

  // Add functionality when an item is clicked
  chrome.contextMenus.onClicked.addListener((clickData) => {
  
    if (workspaceExists(clickData.menuItemId)) {

      const notificationTextFormatted = formatText(clickData.selectionText);

      createNotification(notificationTextFormatted);

      saveTextToDb(clickData.selectionText, clickData.pageUrl);
    }
  });

} catch (e) {
  console.error(e);
}
