/*global chrome*/

const serverAddr = "http://localhost:5000";

fetch(`${serverAddr}/accounts`)
  .then((r) => r.text())
  .then((result) => {
    // Result now contains the response text, do what you want...
    console.log("The fetch has been made. " + "The result is: " + result.JSON);
  });

// Context menu items
//--------------------------------------------------------------

const parentContextMenuItem = {
  id: "parent",
  title: "Add to workspace",
  contexts: ["selection"],
};

const workspaces = [
  {
    id: "1",
    name: "My Workspace"
  }
];

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
  // Check if the menu item that was clicked was one of the workspaces
  const matchingIds = workspaces.filter((workspace) => clickData.menuItemId === workspace.id);

  if (matchingIds.length != 1) {
    const errorMessage =
      matchingIds.length === 0
        ? "No workspace ID matched the menuID"
        : matchingIds.length + " IDs were found. They were: " + matchingIds;

    console.error(errorMessage);
  }

  chrome.notifications.create({
    title: "Text Saved",
    message:
      "The text has been added to your workspace: " + clickData.selectionText + ".'",
    iconUrl: "logo.png",
    type: "basic",
  });

  const text = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      text: clickData.selectionText,
      source: clickData.pageUrl,
      creationDate: Date.now(),
      updateDate: null,
      deleteDate: null
    }),
  };

  fetch(`${serverAddr}/texts/add`, text)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});
