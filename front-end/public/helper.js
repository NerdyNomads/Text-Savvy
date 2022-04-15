/* global chrome */
/* eslint-disable no-undef */
const MAX_TEXT_NOTIF_CHARACTERS = 20;

export const serverAddr = "http://localhost:5000";

export const formatText = (input) => {
  return input.length > MAX_TEXT_NOTIF_CHARACTERS ? `"${input.slice(0, MAX_TEXT_NOTIF_CHARACTERS)}..."` : `"${input}"` ;
};

export const workspaceExists = (id, workspaces) => {
  
  // Check if the menu item that was clicked was one of the workspaces
  const matchingIds = workspaces.filter((workspace) => id === workspace._id);
  
  if (matchingIds.length != 1) {
    throw matchingIds.length === 0
      ? new Error("No workspace ID matched the menuID")
      : new Error(matchingIds.length + " IDs were found.");
  }

  return matchingIds.length == 1;
  
};
  
export const createNotification = (text) => {
  chrome.notifications.create({
    title: "Text Saved",
    message:
        `The text ${text} has been added to your workspace.`,
    iconUrl: "logo.png",
    type: "basic",
  });
};
  
export const saveTextToDb = (text, source, workspaceID) => {
  const textData = {
    text: text,
    source: source,
    workspaceID: workspaceID,
    creationDate: Date.now(),
    updateDate: null,
    deleteDate: null
  };

  const postPackedData = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(textData),
  };
    
  fetch(`${serverAddr}/texts/add`, postPackedData)
    .then((response) => response.json())
    .then((data) => {
      updateWorkspaceToDb(data, workspaceID);
    });
  return textData; 
}; 

export const workspaceIsClicked = (clickData, workspaces) => {
  if (workspaceExists(clickData.menuItemId, workspaces)) {
          
    const notificationTextFormatted = formatText(clickData.selectionText);
    
    createNotification(notificationTextFormatted);
    return saveTextToDb(clickData.selectionText, clickData.pageUrl, clickData.menuItemId);
  }
};

export const updateWorkspaceToDb = (textData, workspaceID) => {
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

  fetch(`${serverAddr}/workspaces/update/${workspaceID}`, putPackedData)
    .then(response => response.json());}; 

export const createContextMenus = (workspace, workspaceIds, totalWorkspaces) => {
  if (totalWorkspaces.indexOf(workspace._id) !== -1) {
    workspaceIds.push(workspace._id);
    chrome.contextMenus.create({
      id: workspace._id,
      title: workspace.name,
      contexts: ["selection"],
      parentId: "parent",
    });
  }
};

export const createWorkspaceContextMenus = (workspaceIds, totalWorkspaces) => {
  // Add all the workspaces as children
  fetch(`${serverAddr}/workspaces`)
    .then((r) => r.text())
    .then((workspaceResult) => {
    // Result now contains the response text, do what you want...
      const workspaces = JSON.parse(workspaceResult);
      workspaces.map((workspace) => {
        // condition to avoid creating duplicate context menus
        if (workspaceIds.indexOf(workspace._id) === -1) { 
          createContextMenus(workspace, workspaceIds, totalWorkspaces);
        }
      });
    });
};
