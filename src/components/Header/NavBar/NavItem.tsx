// Import libraries
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components

// Styles
const Li = styled.li`
  color: ${props => props.theme.colors.yellow};
  margin: 0 0.7rem;
  font-weight: 800;
  transition: all 0.2s ease-in;

  &:hover {
    color: ${props => props.theme.colors.blue};
  }
`;

// Interface
interface IProps {
  title: string;
}

// Component
const NavItem: React.FC<IProps> = props => {
  const { title } = props;
  return <Li>{title}</Li>;
};

// Prop types declaration
NavItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NavItem;
