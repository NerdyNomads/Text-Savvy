/* global chrome */

const button = document.getElementById("extButton");
button.onclick = function click() {
  chrome.tabs.create(
    {
      url: "http://localhost:3000"
    },
  );
};

