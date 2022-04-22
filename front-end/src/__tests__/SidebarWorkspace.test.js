/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, configure, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import axios  from "axios";

import SidebarWorkspace from "../molecules/SidebarWorkspace";
import { AddWorkspaceIcon } from "../atoms/icons";

configure({ adapter: new Adapter() });  

jest.mock("axios");
jest.mock("../atoms/SidebarWorkspaceItem", () => {
  return () => <div />;
});

const whenStable = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

test("Should match the snapshot.", () => { 
  const mockFunc = () => null;
  let wrapper = shallow(<SidebarWorkspace onSelectWorkspace={mockFunc} accountId=""/>);
  expect(wrapper.html()).toMatchSnapshot();
});

test("Should contain the header that has the button to add a workspace.", () => { 
  const mockFunc = () => null;
  let wrapper = shallow(<SidebarWorkspace onSelectWorkspace={mockFunc} accountId=""/>);
  let header = wrapper.find(".SidebarWorkspace-header");
  expect(header.length).toBe(1);
  expect(header.first().text()).toContain("My Workspaces");
  expect(wrapper.containsMatchingElement(<AddWorkspaceIcon />)).toEqual(true);
});

test("Clicking the '+' button on the header should show the input field.", () => { 
  const mockFunc = () => null;
  let wrapper = shallow(<SidebarWorkspace onSelectWorkspace={mockFunc} accountId=""/>);

  let addIcon = wrapper.find(".SidebarWorkspace-add-icon").first();
  addIcon.simulate("click");

  let inputField = wrapper.find(".SidebarWorkspace-add-input");
  expect(inputField.length).toBe(1);
});

test("Adding a workspace name into input field and pressing 'Enter' should add it to the database.", async () => { 
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { reload: jest.fn() },
  });
  axios.post.mockResolvedValueOnce({data: {_id: "123"}});

  const mockFunc = () => null;
  let wrapper = mount(<SidebarWorkspace onSelectWorkspace={mockFunc} accountId=""/>);
  await whenStable();
  
  let addIcon = wrapper.find(".SidebarWorkspace-add-icon").first();
  addIcon.simulate("click");
  
  let inputField = wrapper.find(".SidebarWorkspace-add-input").first();

  await act( async () => {
    inputField.simulate("keypress", {key: "Enter", target: {value: "Workspace Name"}});
  });

  expect(axios.post).toBeCalledTimes(1);
});
