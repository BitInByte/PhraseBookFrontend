import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavItems from "./NavItems";
import NavItem from "./NavItem";

Enzyme.configure({ adapter: new Adapter() });

describe("<NavItems />", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems isAuth={false} />);
  });

  it("should have 1 <NavItem /> on not authenticated mode", () => {
    expect(wrapper.find(NavItem)).toHaveLength(1);
  });
});
