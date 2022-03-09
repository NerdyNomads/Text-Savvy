/* eslint-disable no-undef */

import { formatText, workspaceExists, workspaces } from "../../public/helper";

describe("Chrome Extension", () => {

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

