// Import libraries
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Import components
import NavItem from "./NavItem";

// Styles
interface IStyled {
  isSideDrawer?: boolean;
}

const Ul = styled.ul<IStyled>`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: ${props => (props.isSideDrawer ? "column" : "row")};
`;

// Interface
interface IProps extends IStyled {
  // isSideDrawer?: boolean;
}

// Component
const NavItems: React.FC<IProps> = props => {
  // const { isSideDrawer } = props;

  const navItems = (
    <>
      <NavItem title="Authenticate" />
      {/*<NavItem title="Authenticate" />*/}
      {/*<NavItem title="Authenticate" />*/}
    </>
  );

  return <Ul isSideDrawer={props.isSideDrawer}>{navItems}</Ul>;
};

// Prop types declaration
NavItems.propTypes = {
  isSideDrawer: PropTypes.bool,
};

export default NavItems;
