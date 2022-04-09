/* global chrome */

const button = document.getElementById("extButton");
button.onclick = () => chrome.tabs.create({ url: "http://localhost:3000" });

