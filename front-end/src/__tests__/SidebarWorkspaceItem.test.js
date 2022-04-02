/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { shallow } from "enzyme";

import SidebarWorkspaceItem from "../atoms/SidebarWorkspaceItem";

test("Should match the snapshot.", () => { 
  const mockFunc = () => null;
  let wrapper = shallow(<SidebarWorkspaceItem id="" name="" selected={false} onEdit={mockFunc} onClickWorkspace={mockFunc}/>);
  expect(wrapper.html()).toMatchSnapshot();
});

test("Should call the onEdit function if the edit icon is clicked.", () => { 
  const mockFunc = () => null;
  let onEdit = jest.fn();
  let wrapper = shallow(<SidebarWorkspaceItem id="" name="" selected={false} onEdit={onEdit} onClickWorkspace={mockFunc}/>);
  
  let editDiv = wrapper.find(".SidebarWorkspaceItem-edit").first();
  editDiv.simulate("click");
  
  expect(onEdit).toBeCalledTimes(1);
});

test("Should display the whole workspace name if its length is less than 20.", () => { 
  const mockFunc = () => null;
  let workspaceName = "Short Name";
  let wrapper = shallow(<SidebarWorkspaceItem id="" name={workspaceName} selected={false} onEdit={mockFunc} onClickWorkspace={mockFunc}/>);
  
  let nameDiv = wrapper.find(".SidebarWorkspaceItem-name").first();
  expect(nameDiv.text()).toBe(workspaceName);
});

test("Should display a trimmed workspace name if its length is greater than 20.", () => { 
  const mockFunc = () => null;
  let workspaceName = "Very very very very long name";
  let wrapper = shallow(<SidebarWorkspaceItem id="" name={workspaceName} selected={false} onEdit={mockFunc} onClickWorkspace={mockFunc}/>);
  
  let nameDiv = wrapper.find(".SidebarWorkspaceItem-name").first();
  let trimmedName = "Very very very very ...";
  expect(nameDiv.text()).toBe(trimmedName);
});

test("Should call the onClickWorkspace function if the component is clicked.", () => { 
  const mockFunc = () => null;
  let onClickWorkspace = jest.fn();
  let wrapper = shallow(<SidebarWorkspaceItem id="" name="" selected={false} onEdit={mockFunc} onClickWorkspace={onClickWorkspace}/>);
  
  let sidebarWorkspaceItem = wrapper.find(".SidebarWorkspaceItem").first();
  sidebarWorkspaceItem.simulate("click");
  
  expect(onClickWorkspace).toBeCalledTimes(1);
});