// Import libraries
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components

// Styles
const BurgerLine = styled.div`
  width: 100%;
  height: 0.4rem;
  background: ${props => props.theme.colors.yellow};
  transition: all 0.2s ease-in;
`;

const BurgerButton = styled.button`
  display: none;
  //display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 4rem;
  height: 3.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  @media ${props => props.theme.mediaQueries.medium} {
    display: flex;
  }

  &:hover ${BurgerLine} {
    background: ${props => props.theme.colors.blue};
  }
`;

// Interface
interface IProps {
  toggleDrawer: () => void;
}

// Component
const SideDrawerButton: React.FC<IProps> = props => {
  const { toggleDrawer } = props;

  return (
    <BurgerButton onClick={toggleDrawer}>
      <BurgerLine />
      <BurgerLine />
      <BurgerLine />
    </BurgerButton>
  );
};

// Prop types declaration
SideDrawerButton.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideDrawerButton;
