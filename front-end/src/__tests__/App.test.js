/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { shallow } from "enzyme";

import App from "../App";
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "../organisms/Sidebar";
import Dashboard from "../pages/Dashboard";

jest.mock("@auth0/auth0-react"); 

const auth0User = {
  sub: "abc|12345",
  nickname: "Test"
};

test("Should match the snapshot.", () => { 
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user: auth0User
  });

  const wrapper = shallow(<App />);
  expect(wrapper.html()).toMatchSnapshot();
});

test("Sidebar and Dashboard should be visible if user is logged in.", () => { 
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user: auth0User
  });

  const wrapper = shallow(<App />);
  expect(wrapper.containsMatchingElement(<Sidebar/>)).toEqual(true);
  expect(wrapper.containsMatchingElement(<Dashboard/>)).toEqual(true);
});

test("Component should be empty if no user is logged in.", () => { 
  useAuth0.mockReturnValue({
    isAuthenticated: false
  });

  const wrapper = shallow(<App />);
  expect(wrapper.html()).toEqual("");
  expect(wrapper.containsMatchingElement(<Sidebar/>)).toEqual(false);
  expect(wrapper.containsMatchingElement(<Dashboard/>)).toEqual(false);
});

// TODO:
// - loginWithRedirect
// - isNewAccount
// - addNewAccount
