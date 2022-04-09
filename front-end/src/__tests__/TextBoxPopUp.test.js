/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { shallow } from "enzyme";

import TextBoxPopUp from "../atoms/TextBox/TextBoxPopUp";

let props;
beforeEach(() => {
  props = {
    textItem: {
      text: "Test",
      _id: "0",
      creationDate: 0,
      source: "www.abc.com"
    },
    onChangeVisibility: jest.fn()
  };
});

test("Should match the snapshot.", () => { 
  let wrapper = shallow(<TextBoxPopUp {...props}/>);
  expect(wrapper.html()).toMatchSnapshot();
});

test("Clicking the background should toggle the pop-up's visibility.", async () => { 
  let wrapper = shallow(<TextBoxPopUp {...props}/>);
 
  let popUpBackground = wrapper.find(".TextBoxPopUp-background").first();
  expect(popUpBackground.length).toEqual(1);

  let event = {
    target: {
      className: "TextBoxPopUp-background"
    }
  };

  popUpBackground.simulate("click", event);
  expect(props.onChangeVisibility).toHaveBeenCalledTimes(1);
});

test("Clicking the exit button should toggle the pop-up's visibility.", async () => { 
  let wrapper = shallow(<TextBoxPopUp {...props}/>);

  let popUpExit = wrapper.find(".TextBoxPopUp-exit").first();
  expect(popUpExit.length).toEqual(1);

  popUpExit.simulate("click");
  expect(props.onChangeVisibility).toHaveBeenCalledTimes(1);
});
