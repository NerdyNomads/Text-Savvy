/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, configure, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import axios  from "axios";

import Dashboard from "../pages/Dashboard";
import TextList from "../molecules/TextList";

configure({ adapter: new Adapter() });  

jest.mock("axios");
jest.mock("../molecules/TextList", () => {
  return () => <div />;
});

const textItems = [
  { text: "Test1", source: "Test1" },
  { text: "Test1", source: "Test1" },
];

const whenStable = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

test("Should match the snapshot.", () => { 
  let wrapper = shallow(<Dashboard workspaceId=""/>);
  expect(wrapper.html()).toMatchSnapshot();
});

test("TextList component should be displayed when the data has been received.", async () => { 
  axios.get
    .mockResolvedValueOnce({data: {name: ""}})
    .mockResolvedValueOnce({data: textItems});

  let realUseState = React.useState;
  let stubInitialState = textItems;
  jest.spyOn(React, "useState").mockImplementationOnce(() => {
    realUseState(stubInitialState);
  });

  let wrapper = mount(<Dashboard workspaceId="12345"/>);
  await whenStable();
  expect(axios.get).toBeCalledTimes(2);

  wrapper.update();
  expect(wrapper.containsMatchingElement(<TextList />)).toEqual(true);
});

test("Dashboard should show the workspace's name.", async () => { 
  let renderedWorkspaceTitle = "Test Workspace";
  axios.get.mockResolvedValueOnce({data: {name: renderedWorkspaceTitle}});

  let realUseState = React.useState;
  let stubInitialState = renderedWorkspaceTitle;
  jest.spyOn(React, "useState").mockImplementationOnce(() => {
    realUseState(stubInitialState);
  });

  let wrapper = mount(<Dashboard workspaceId="12345"/>);
  await whenStable();

  let titleDiv = wrapper.find(".Dashboard-title");
  expect(titleDiv.length).toEqual(1);  
  expect(titleDiv.first().text()).toEqual(renderedWorkspaceTitle);
});
