/* global chrome */
const button = document.getElementById("extButton");
button.onclick = function click() {
  console.log("Button clicked.");
  chrome.tabs.create(
    {
      url: "http://localhost:3000"
    },
  );
};