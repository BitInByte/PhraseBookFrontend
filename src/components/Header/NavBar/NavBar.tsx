// Import libraries
import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components
import BurgerButton from "./SideDrawer/SideDrawerButton/SideDrawerButton";
import NavItems from "./NavItems";
import BackDrop from "../../ui/BackDrop/BackDrop";
import SideDrawer from "./SideDrawer/SideDrawer";

// Styles
const NavWrapper = styled.div`
  @media ${props => props.theme.mediaQueries.medium} {
    display: none;
  }
`;

const Nav = styled.nav`
  //flex: 1;
  //width: auto;
  //flex-shrink: 0;
  //flex-grow: 1;
  font-size: 2rem;
  margin-right: 1rem;
  margin-left: auto;
`;

// Interface
interface IProps {
  isAuth: string | null;
}

// Component
const NavBar: React.FC<IProps> = ({ isAuth }) => {
  const [drawOpen, setDrawOpen] = useState(false);

  const toggleDrawHandler = () => {
    setDrawOpen(prevState => !prevState);
    // console.log(drawOpen);
  };

  return (
    <Nav>
      {drawOpen && <BackDrop toggleDrawer={toggleDrawHandler} />}
      <SideDrawer isAuth={!!isAuth} showDrawer={drawOpen} />
      <NavWrapper>
        {/* Same than isAuth ? true : false  */}
        <NavItems isAuth={!!isAuth} />
      </NavWrapper>
      <BurgerButton toggleDrawer={toggleDrawHandler} />
    </Nav>
  );
};

// Prop types declaration
NavBar.propTypes = {
  isAuth: PropTypes.string,
};

export default NavBar;
