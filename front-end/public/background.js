/*global chrome*/
import * as helper from "./helper.js";

try {
  const serverAddr = "http://localhost:5000";

  // Context menu items
  //--------------------------------------------------------------

  const parentContextMenuItem = {
    id: "parent",
    title: "Add to Workspace",
    contexts: ["selection"],
  };

  // fetch(`${serverAddr}/accounts`)
  //   .then((r) => r.text())
  //   .then((result) => {
  //   // Result now contains the response text, do what you want...
  //     console.log("The fetch has been made. " + "The result is: " + JSON.stringify(result));
  //   });


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
        if (helper.workspaceExists(clickData.menuItemId, workspaces)) {
          
          const notificationTextFormatted = helper.formatText(clickData.selectionText);
          
          helper.createNotification(notificationTextFormatted);
          textData = helper.saveTextToDb(clickData.selectionText, clickData.pageUrl, clickData.menuItemId);
        }
        const putPackedData = {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            $push: {texts: textData},
            creationDate: null,
            updateDate: Date.now(),
            deleteDate: null
          }),
        };
      
        fetch(`${serverAddr}/workspaces/update/${clickData.menuItemId}`, putPackedData)
          .then(response => response.json())
          .then((data) => {
            console.log(data);
          });  
      });
      
  });

} catch (e) {
  console.error(e);
}
