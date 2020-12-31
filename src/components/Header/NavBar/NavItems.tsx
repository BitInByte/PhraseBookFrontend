// Import libraries
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// Import components
import NavItem from "./NavItem";

import { logout } from "../../../store/actions/authAction";

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
  color: ${props => props.theme.colors.yellow};
`;

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.colors.yellow};
  &.active {
    color: ${props => props.theme.colors.blue};
  }
`;

// Interface
interface IProps extends IStyled {
  isAuth: boolean;
}

// Component
const NavItems: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const history = useHistory();

  const signout = () => {
    dispatch(logout());
    // history.push("/");
  };

  let navItems;
  if (!props.isAuth) {
    navItems = (
      <>
        <StyledLink to="/auth">
          <NavItem title="Authenticate" />
        </StyledLink>
      </>
    );
  } else {
    navItems = (
      <>
        <a onClick={signout}>
          <NavItem title="Logout" />
        </a>
      </>
    );
  }

  return <Ul isSideDrawer={props.isSideDrawer}>{navItems}</Ul>;
};

// Prop types declaration
NavItems.propTypes = {
  isSideDrawer: PropTypes.bool,
  isAuth: PropTypes.bool.isRequired,
};

export default NavItems;
