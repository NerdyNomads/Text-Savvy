/* eslint-disable no-undef */
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import userEvent from "@testing-library/user-event";
import chrome from "sinon-chrome";
import {assert} from "chai";

import { formatText, workspaceExists, workspaces } from "../../public/helper";

let dom;
let container;

const html = fs.readFileSync(path.resolve(__dirname, "../../public/popup.html"), "utf8");

describe("Chrome Extension", () => {

  // https://dev.to/thawkin3/how-to-unit-test-html-and-vanilla-javascript-without-a-ui-framework-4io
  describe("Test Popup", () => {
    beforeEach(() => {
      // Constructing a new JSDOM with this option is the key
      // to getting the code in the script tag to execute.
      // This is indeed dangerous and should only be done with trusted content.
      // https://github.com/jsdom/jsdom#executing-scripts
      dom = new JSDOM(html, { runScripts: "dangerously" });
      container = dom.window.document.body;
    });
    
    it("renders popup button correctly", () => {
      expect(container.querySelector("button")).not.toBeUndefined();
      expect(container.querySelector("button")).toHaveTextContent("Go to Text Savvy");
    });

    // edit to the production server when app can be deployed
    it("redirects to the local server when ", () => {
      global.chrome = chrome;
      const button = container.querySelector("button");
      userEvent.click(button);
      assert.ok(true, chrome.tabs.create.withArgs({ url: "http://localhost:3000" }).calledOnce);
      chrome.flush();
      delete global.chrome;
    });

  
    it("opens a new tab when the button is clicked", () => {
      global.chrome = chrome;
      const button = container.querySelector("button");
      userEvent.click(button);
      assert.ok(true, chrome.tabs.create.calledOnce);
      chrome.flush();
      delete global.chrome;
    });

  });

  describe("Test Notification", () => {
    test("entering empty string should still work", () => {
      expect(formatText("")).toBe("\"\"");
    });

    test("should add ellipses when text length is > 20.", () => { 
      expect(formatText("lessThan20")).toEqual(expect.not.stringContaining("..."));
    });

    test("should not add ellipses when text length is < 20.", () => { 
      expect(formatText("This is test is very long. It has more than 20 characters in it.")).toEqual(expect.stringContaining("..."));
    });

    test("should trim text > 20 char to 20 char.", () => {
      expect(formatText("This is test is very long. It has more than 20 characters in it.")).toBe("\"This is test is very...\"");
    });
  });
  
  describe("Test Context Menus", () => {
    test("should not print an error message when there is one (and only one) matching id.", () => {
      expect(workspaceExists("1")).toBeTruthy();
    });

    test("should print an error message when there is no matching id.", () => {
      expect(() => {
        workspaceExists("99");
      }).toThrow("No workspace ID matched the menuID");
    });

    test("should print an error message when matching ids is > 1.", () => {
      workspaces.push({
        id: "1",
        name: "My Workspace 2"
      },
      {
        id: "1",
        name: "My Workspace 3"
      });

      expect(() => { 
        workspaceExists("1"); 
      }).toThrow("3 IDs were found.");

    });
  });
});

