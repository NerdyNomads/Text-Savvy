/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { shallow } from "enzyme";

import Sidebar from "../organisms/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import SidebarWorkspace from "../molecules/SidebarWorkspace";

jest.mock("@auth0/auth0-react"); 
jest.mock("../molecules/SidebarWorkspace", () => {
  const SidebarWorkspaceTest = () => <div />;
  return SidebarWorkspaceTest;
});

beforeEach(() => {
  useAuth0.mockReturnValue({
    logout: jest.fn(),
    user: {
      nickname: "Test"
    } 
  });
});

test("Should match the snapshot.", () => { 
  const mockFunc = () => null;
  let wrapper = shallow(<Sidebar onClickWorkspace={mockFunc} accountId=""/>);
  expect(wrapper.html()).toMatchSnapshot();
});

test("Clicking the logout button should call Auth0's logout function.", () => {
  global.chrome = {
    runtime: {
      sendMessage: jest.fn()
    }
  };
  const mockFunc = () => null;
  let wrapper = shallow(<Sidebar onClickWorkspace={mockFunc} accountId=""/>);

  let logoutDiv = wrapper.find(".SideBar-logout");
  expect(logoutDiv.length).toEqual(1);
  logoutDiv.simulate("click");
  expect(useAuth0().logout).toHaveBeenCalledTimes(1);
});

test("Should display the logout button.", () => {
  const mockFunc = () => null;
  let wrapper = shallow(<Sidebar onClickWorkspace={mockFunc} accountId=""/>);

  let logoutDiv = wrapper.find(".SideBar-logout");
  expect(logoutDiv.length).toEqual(1);

  let logoutText = wrapper.find(".SideBar-option-text").at(0);
  expect(logoutText.length).toEqual(1);
  expect(logoutText.text()).toEqual("Logout");
});

test("Should display the SidebarWorkspace component.", () => {
  const mockFunc = () => null;
  let wrapper = shallow(<Sidebar onClickWorkspace={mockFunc} accountId=""/>);
  
  expect(wrapper.containsMatchingElement(<SidebarWorkspace />)).toEqual(true);
});
