/*global chrome*/

const MAX_TEXT_NOTIF_CHARACTERS = 20;
const serverAddr = "http://localhost:5000";

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


const formatText = (input) => {
  
  input = input.slice(0, MAX_TEXT_NOTIF_CHARACTERS); 
  return input.length > MAX_TEXT_NOTIF_CHARACTERS ? `"${input}..."` : `"${input}"` ;
};

const checkWorkspaceExistance = (id) => {

  // Check if the menu item that was clicked was one of the workspaces
  const matchingIds = workspaces.filter((workspace) => id === workspace.id);

  if (matchingIds.length != 1) {
    const errorMessage =
      matchingIds.length === 0
        ? "No workspace ID matched the menuID"
        : matchingIds.length + " IDs were found. They were: " + matchingIds;

    console.error(errorMessage);
  }

};

const createNotification = (text) => {

  chrome.notifications.create({
    title: "Text Saved",
    message:
      `The text ${text} has been added to your workspace.`,
    iconUrl: "logo.png",
    type: "basic",
  });
};

const saveTextToDb = (text, source) => {

  const packedData = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      text: text,
      source: source,
      creationDate: Date.now(),
      updateDate: null,
      deleteDate: null
    }),
  };

  fetch(`${serverAddr}/texts/add`, packedData)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

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
  
  checkWorkspaceExistance(clickData.menuItemId);

  const notificationTextFormatted = formatText(clickData.selectionText);

  createNotification(notificationTextFormatted);

  saveTextToDb(clickData.selectionText, clickData.pageUrl);

});
