/*global chrome*/

fetch("http://localhost:5000/accounts")
	.then((r) => r.text())
	.then((result) => {
		// Result now contains the response text, do what you want...
		console.log("The fetch has been made. " + "The result is: " + result.JSON);
	});

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

	if (matchingIds.length != 1) {
		const errorMessage =
			matchingIds.length === 0
				? "No workspace ID matched the menuID"
				: matchingIds.length + " IDs were found. They were: " + matchingIds;

		console.error(errorMessage);
	}

	chrome.notifications.create({
		title: "Click Notifier",
		message:
			"You clicked [" +
			matchingIds[0].name +
			"]. The text is: '" +
			clickData.selectionText +
			"'",
		iconUrl: "Text Savvy Logo.png",
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
			creationDate: new Date(),
		}),
	};

	fetch("http://localhost:5000/texts/add", text)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		});
});
