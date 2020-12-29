// Import libraries
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Import components

// Styles
const H2Styles = styled.h2`
  font-size: ${props => props.theme.fontSize.big};
  color: inherit;
  display: inline-block;
  line-height: 1.5;
`;

// Interface
interface IProps {}

// Component
const H2: React.FC<IProps> = ({ children }) => <H2Styles>{children}</H2Styles>;

// Prop types declaration
H2.propTypes = {
  children: PropTypes.string.isRequired,
};

export default H2;
