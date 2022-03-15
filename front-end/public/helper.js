/* eslint-disable no-undef */
const MAX_TEXT_NOTIF_CHARACTERS = 20;

export const workspaces = [
  {
    id: "1",
    name: "My Workspace"
  }
];

export const formatText = (input) => {
  return input.length > MAX_TEXT_NOTIF_CHARACTERS ? `"${input.slice(0, MAX_TEXT_NOTIF_CHARACTERS)}..."` : `"${input}"` ;
};
  
export const workspaceExists = (id) => {
  
  // Check if the menu item that was clicked was one of the workspaces
  const matchingIds = workspaces.filter((workspace) => id === workspace.id);
  
  if (matchingIds.length != 1) {
    const errorMessage =
        matchingIds.length === 0
          ? "No workspace ID matched the menuID"
          : matchingIds.length + " IDs were found.";
  
    throw errorMessage;
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
  
export const saveTextToDb = (text, source) => {
  const serverAddr = "http://localhost:5000";
  
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
