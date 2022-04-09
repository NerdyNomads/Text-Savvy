/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, configure, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import axios  from "axios";

import WorkspaceSettings from "../organisms/WorkspaceSettings";

configure({ adapter: new Adapter() });  
jest.mock("axios");

test("Should match the snapshot.", () => { 
  const mockFunc = () => null;
  let wrapper = shallow(<WorkspaceSettings onChangeVisibility={mockFunc} workspaceId=""/>);
  expect(wrapper.html()).toMatchSnapshot();
});

test("Should display the 'Save' button when a collaborator is added.", async () => { 
  axios.get.mockResolvedValue({data: { collaborators: ["test@email.com"] }});
  global.document.getElementById = jest.fn();
  document.getElementById.mockReturnValue({value: ""});

  const mockFunc = () => null;
  let wrapper = mount(<WorkspaceSettings onChangeVisibility={mockFunc} workspaceId=""/>);

  let addCollaboratorEmailInput = wrapper.find("#add-collaborator-email-input").first();
  await act( async () => {
    addCollaboratorEmailInput.simulate("keypress", { key: "Enter", target: { value: "test2@email.com" }, preventDefault: jest.fn() });  
  });
  wrapper.update();

  let saveBtn = wrapper.find(".WorkspaceSettings-save-btn");
  expect(saveBtn.length).toBe(1);
});

test("Should display an error message if not a valid collaborator email.", async () => { 
  axios.get.mockResolvedValue({data: { collaborators: ["test@email.com"] }});
  global.document.getElementById = jest.fn();
  document.getElementById.mockReturnValue({value: ""});

  const mockFunc = () => null;
  let wrapper = mount(<WorkspaceSettings onChangeVisibility={mockFunc} workspaceId=""/>);

  let addCollaboratorEmailInput = wrapper.find("#add-collaborator-email-input").first();
  await act( async () => {
    addCollaboratorEmailInput.simulate("keypress", { key: "Enter", target: { value: "test" }, preventDefault: jest.fn() });  
  });
  wrapper.update();

  expect(wrapper.html()).toContain("Must be a valid email.");
});

test("Should display an error message if duplicate collaborator email.", async () => { 
  axios.get.mockResolvedValue({data: { collaborators: ["test@email.com"] }});
  global.document.getElementById = jest.fn();
  document.getElementById.mockReturnValue({value: ""});

  const mockFunc = () => null;
  let wrapper = mount(<WorkspaceSettings onChangeVisibility={mockFunc} workspaceId=""/>);

  let addCollaboratorEmailInput = wrapper.find("#add-collaborator-email-input").first();
  await act( async () => {
    addCollaboratorEmailInput.simulate("keypress", { key: "Enter", target: { value: "test@email.com" }, preventDefault: jest.fn() });  
  });
  wrapper.update();

  await act( async () => {
    addCollaboratorEmailInput.simulate("keypress", { key: "Enter", target: { value: "test@email.com" }, preventDefault: jest.fn() });  
  });
  wrapper.update();

  expect(wrapper.html()).toContain("User has already been added.");
});
