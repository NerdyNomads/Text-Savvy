/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { shallow } from "enzyme";

import CollaboratorItem from "../molecules/CollaboratorItem";

test("Should match the snapshot.", () => { 
  const mockFunc = () => null;
  let wrapper = shallow(<CollaboratorItem onRemove={mockFunc} email=""/>);
  expect(wrapper.html()).toMatchSnapshot();
});

test("Should show a '*' after the email if the user is still pending.", () => { 
  const mockFunc = () => null;
  let wrapper = shallow(<CollaboratorItem onRemove={mockFunc} email="test@email.com" pending={true}/>);

  let email = wrapper.find(".CollaboratorItem-pending");
  expect(email.length).toBe(1);
  expect(email.first().text()).toBe("test@email.com*");
});

test("Should show only the email (no '*') if the user is not pending.", () => { 
  const mockFunc = () => null;
  let wrapper = shallow(<CollaboratorItem onRemove={mockFunc} email="test@email.com" pending={false}/>);

  let email = wrapper.find(".CollaboratorItem-email");
  expect(email.length).toBe(1);
  expect(email.first().text()).toBe("test@email.com");
});

test("Should call the onRemove function if the trash can icon is clicked.", () => { 
  let onRemove = jest.fn();
  let wrapper = shallow(<CollaboratorItem onRemove={onRemove} email="test@email.com" pending={false}/>);

  let trashIcon = wrapper.find(".CollaboratorItem-remove").first();
  trashIcon.simulate("click");

  expect(onRemove).toBeCalledTimes(1);
});