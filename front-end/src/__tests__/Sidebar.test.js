/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { shallow } from "enzyme";

import Sidebar from "../organisms/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react"); 

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
  let wrapper = shallow(<Sidebar onClickWorkspace={mockFunc}/>);
  expect(wrapper.html()).toMatchSnapshot();
});

test("Clicking the logout button should call Auth0's logout function.", () => {
  let wrapper = shallow(<Sidebar />);
  let logoutDiv = wrapper.find(".SideBar-logout");

  expect(logoutDiv.length).toEqual(1);

  logoutDiv.simulate("click");
  expect(useAuth0().logout).toHaveBeenCalledTimes(1);
});





