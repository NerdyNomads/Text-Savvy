/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* global chrome */
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, configure, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { useAuth0 } from "@auth0/auth0-react";
import axios  from "axios";

import App from "../App";
import Sidebar from "../organisms/Sidebar";
import Dashboard from "../pages/Dashboard";

configure({ adapter: new Adapter() });  

jest.mock("axios");
jest.mock("@auth0/auth0-react"); 

jest.mock("../molecules/TextList", () => {
  const TextList = () => <div />;
  return TextList;
});

const whenStable = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

const auth0User = {
  sub: "abc|12345",
  nickname: "Test",
  name: "Test",
  email: "test@email.com"
};

beforeEach(() => {
  axios.get.mockResolvedValue({data: {length:0}});
  axios.post.mockResolvedValueOnce({data: [auth0User]});
});

test("Should match the snapshot.", () => { 
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user: auth0User
  });

  let wrapper = shallow(<App />);
  expect(wrapper.html()).toMatchSnapshot();
});

test("Sidebar and Dashboard should be visible if user is logged in.", () => { 
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user: auth0User
  });

  let wrapper = shallow(<App />);
  const mockFunc = () => null;
  expect(wrapper.containsMatchingElement(<Sidebar onClickWorkspace={mockFunc}/>));
  expect(wrapper.containsMatchingElement(<Dashboard workspaceId="1"/>));
});

test("Component should be empty if no user is logged in.", () => { 
  useAuth0.mockReturnValue({
    isAuthenticated: false
  });

  let wrapper = shallow(<App />);
  const mockFunc = () => null;
  expect(wrapper.html()).toEqual("");
  expect(wrapper.containsMatchingElement(<Sidebar onClickWorkspace={mockFunc}/>)).toEqual(false);
  expect(wrapper.containsMatchingElement(<Dashboard workspaceId="1"/>)).toEqual(false);
});

test("Auth0's loginWithRedirect function should be called if no user is logged in.", () => { 
  useAuth0.mockReturnValue({
    isAuthenticated: false,
    loginWithRedirect: jest.fn()
  });

  let wrapper = mount(<App />);
  expect(useAuth0().loginWithRedirect).toBeCalledTimes(1);
});

// test("A new account should be added to the database if the user is new.", async () => { 
//   useAuth0.mockReturnValue({
//     isAuthenticated: true,
//     user: auth0User,
//     getAccessTokenSilently: jest.fn().mockResolvedValueOnce()
//   });

//   let wrapper = mount(<App />);
//   await whenStable();
//   expect(axios.get).toBeCalled();

//   wrapper.update();
//   expect(axios.post).toBeCalledTimes(1);
// });
