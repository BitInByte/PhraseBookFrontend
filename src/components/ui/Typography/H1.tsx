// Import libraries
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Import components

// Styles
const H1Styles = styled.h1`
  font-size: ${props => props.theme.fontSize.h1};
  color: inherit;
  text-align: left;
  //display: block;
  //flex: 1;
`;

// Interface
interface IProps {}

// Component
const H1: React.FC<IProps> = ({ children }) => {
  return <H1Styles>{children}</H1Styles>;
};

// Prop types declaration
H1.propTypes = {};

export default H1;
