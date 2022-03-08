/* eslint-disable no-undef */
// window.onload = function(){ 
//   console.log("CLICKED.");
//   document.getElementById("extButton").onclick = function () {
//     location.href = "http://localhost:3000";
//   };
// };

// var url = "http://localhost:3000";

// eslint-disable-next-line no-unused-vars
const redirectBtn = document.getElementById("extButton");
redirectBtn.addEventListener("click", () => {
  chrome.tabs.getCurrent(() => {

    console.log("LCICKED!!!!!");
  });
});

