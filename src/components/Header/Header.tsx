// Import libraries
import React from "react";
import styled from "styled-components";

// Import components
import Logo from "../ui/Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "./NavBar/NavBar";

// Styles
const HeaderWrapper = styled.header`
  width: 100%;
  background-color: ${props => props.theme.colors.pink};
  padding: 1.5rem;
  border-radius: 0 0 2rem 2rem;
  box-shadow: 0 0.5rem 2rem ${props => props.theme.colors.pink};
  display: flex;
  align-items: center;
`;

// Interface
interface IProps {}

// Component
const Header: React.FC<IProps> = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <SearchBar />
      <NavBar />
    </HeaderWrapper>
  );
};

// Prop types declaration
Header.propTypes = {};

export default Header;
