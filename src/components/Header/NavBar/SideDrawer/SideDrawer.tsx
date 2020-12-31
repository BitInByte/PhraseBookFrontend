// Import libraries
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

// Import components
import NavItems from "../NavItems";

// Styles
const SideDrawerWrapper = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 30rem;
  background: ${props => props.theme.colors.pink};
  color: ${props => props.theme.colors.yellow};

  box-shadow: 0 2px 8px ${props => props.theme.colors.pink};

  //&.slide-in-left-enter {
  //  transform: translateX(-100%);
  //}
  //
  //&.slide-in-left-enter-active {
  //  transform: translateX(0);
  //  opacity: 1;
  //  transition: all 200ms;
  //}
  //
  //&.slide-in-left-exit {
  //  transform: translateX(0%);
  //  opacity: 1;
  //}
  //
  //&.slide-in-left-exit-active {
  //  transform: translateX(-100%);
  //  opacity: 0;
  //  transition: all 200ms;
  //}
`;

const Nav = styled.nav`
  font-size: 2.5rem;
  padding: 1.5rem;
  margin-top: 1rem;
`;

// Interface
interface IProps {
  showDrawer: boolean;
  isAuth: boolean;
}

// Component
const SideDrawer: React.FC<IProps> = props => {
  const { showDrawer } = props;

  const reactElement = (
    <CSSTransition
      in={showDrawer}
      timeout={500}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <SideDrawerWrapper>
        <Nav>
          <NavItems isSideDrawer isAuth={props.isAuth} />
        </Nav>
      </SideDrawerWrapper>
    </CSSTransition>
  );

  const htmlElement = document.getElementById("drawer-hook");

  if (!htmlElement) {
    throw new Error("Element not found!");
  }

  return ReactDOM.createPortal(reactElement, htmlElement);
};

// Prop types declaration
SideDrawer.propTypes = {
  showDrawer: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default SideDrawer;
