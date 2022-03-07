/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { shallow } from "enzyme";

import TextBox from "../atoms/TextBox";
import axios from "axios";

jest.mock("axios");

let props;
const longText =
  "An application programming interface (API) is a connection between computers or between computer programs. It is a type of software interface, offering a service to other pieces of software. A document or standard that describes how to build or use such a connection or interface is called an API specification.";

beforeEach(() => {
  props = {
    textItem: {
      _id: "1",
      creationDate: 0,
      source: "",
      text: "Test Text",
    },
    onDelete: jest.fn(),
  };
});

test("Should match the snapshot.", () => {
  const wrapper = shallow(<TextBox {...props} />);
  expect(wrapper.html()).toMatchSnapshot();
});

test("Logout button should not be visible if a user is not logged in.", () => {
  const wrapper = shallow(<TextBox {...props} />);
  expect(wrapper.find("button").length).toEqual(0);
});

test("Long text being cut off", () => {
  props.textItem.text = longText;
  const wrapper = shallow(<TextBox {...props} />);
  expect(wrapper.text()).not.toContain(longText);
  expect(wrapper.text()).toContain("...");
});

test("Short text not being cut off", () => {
  const wrapper = shallow(<TextBox {...props} />);
  expect(wrapper.text()).toContain(props.textItem.text);
  expect(wrapper.text()).not.toContain("...");
});

test("Deletion", async () => {
  const wrapper = shallow(<TextBox {...props} />);
  // wrapper.find(".delete").to.have.length(1); //simulate("click");
  await wrapper.find("div.delete").simulate("click");
  () => expect(props.onDelete).toHaveBeenCalledTimes(1);
});
