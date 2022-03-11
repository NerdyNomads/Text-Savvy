/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { shallow } from "enzyme";

import TextBoxPopUp from "../atoms/TextBoxPopUp";

test("Should match the snapshot.", () => { 
  let testText = "Test";
  let testSource  = "www.abc.com";
  let  onChangeVisibility = jest.fn();
  let wrapper = shallow(<TextBoxPopUp text={testText} source={testSource} onChangeVisibility={onChangeVisibility}/>);
  expect(wrapper.html()).toMatchSnapshot();
});

test("Clicking the background should toggle the pop-up's visibility.", async () => { 
  let testText = "Test";
  let testSource  = "www.abc.com";
  let  onChangeVisibility = jest.fn();
  let wrapper = shallow(<TextBoxPopUp text={testText} source={testSource} onChangeVisibility={onChangeVisibility}/>);
 
  let popUpBackground = wrapper.find(".TextBoxPopUp-background").first();
  expect(popUpBackground.length).toEqual(1);

  let event = {
    target: {
      className: "TextBoxPopUp-background"
    }
  };

  popUpBackground.simulate("click", event);
  expect(onChangeVisibility).toHaveBeenCalledTimes(1);
});

test("Clicking the exit button should toggle the pop-up's visibility.", async () => { 
  let testText = "Test";
  let testSource  = "www.abc.com";
  let  onChangeVisibility = jest.fn();
  let wrapper = shallow(<TextBoxPopUp text={testText} source={testSource} onChangeVisibility={onChangeVisibility}/>);

  let popUpExit = wrapper.find(".TextBoxPopUp-exit").first();
  expect(popUpExit.length).toEqual(1);

  popUpExit.simulate("click");
  expect(onChangeVisibility).toHaveBeenCalledTimes(1);
});
