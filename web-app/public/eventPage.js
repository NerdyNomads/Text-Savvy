// Figure out how to make it so the option only appears when there is text selected

const workspaces = [
    {
        id: "1",
        name: "Science Notes",
    },
    {
        id: "2",
        name: "Funny Quotes",
    },
    {
        id: "3",
        name: "Research Paper Notes",
    },
    {
        id: "4",
        name: "Places to Explore",
    },
];

const parentContextMenuItem = {
    id: "parent",
    title: "Add to workspace",
    contexts: ["selection"],
};

const childContextMenuItem = {
    id: "child",
    title: "child",
    contexts: ["selection"],
    parentId: "parent",
};

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

// Add functionality when an item is clicked
chrome.contextMenus.onClicked.addListener((clickData) => {
    // Check if the menu item that was clicked was one of the workspaces
    const matchingIds = workspaces.filter((workspace) => clickData.menuItemId === workspace.id);

    if (matchingIds.length > 0) {
        console.log("matchingIds is:", matchingIds);

        chrome.notifications.create({
            title: "Click Notifier",
            message:
                "You clicked [" +
                matchingIds[0].name +
                ']. The text is: "' +
                clickData.selectionText +
                '"',
            iconUrl: "Text Savvy Logo.png",
            type: "basic",
        });
    }
});
