// Figure out how to make it so the option only appears when there is text selected

const parentContextMenuItem = {
    id: "parent",
    title: "parent",
    contexts: ["all"],
};

const childContextMenuItem = {
    id: "child",
    title: "child",
    contexts: ["all"],
    parentId: "parent",
};

chrome.contextMenus.create(parentContextMenuItem);

chrome.contextMenus.create(childContextMenuItem);
