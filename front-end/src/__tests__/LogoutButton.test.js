/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { shallow } from "enzyme";

import LogoutButton from "../atoms/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react"); 

test("Should match the snapshot.", () => { 
  useAuth0.mockReturnValue({
    isAuthenticated: true, 
    logout: jest.fn() 
  });

  const wrapper = shallow(<LogoutButton />);
  expect(wrapper.html()).toMatchSnapshot();
  expect(wrapper.find("button").length).toEqual(1);
});

test("Logout button should not be visible if a user is not logged in.", () => { 
  useAuth0.mockReturnValue({
    isAuthenticated: false, 
    logout: jest.fn() 
  });
    
  const wrapper = shallow(<LogoutButton />);
  expect(wrapper.find("button").length).toEqual(0);
});

test("Clicking the Logout button should call Auth0's logout function.", () => { 
  useAuth0.mockReturnValue({
    isAuthenticated: true, 
    logout: jest.fn() 
  });
      
  const wrapper = shallow(<LogoutButton />);
  const logoutButton = wrapper.find("button").first();

  logoutButton.simulate("click");
  expect(useAuth0().logout).toHaveBeenCalledTimes(1);
});