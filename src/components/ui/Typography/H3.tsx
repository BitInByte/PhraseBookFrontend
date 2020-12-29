// Import libraries
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components

// Styles
const H3Styles = styled.h3`
  font-size: ${props => props.theme.fontSize.medium};
  color: inherit;
  display: inline-block;
  line-height: 1.5;
`;

// Interface
interface IProps {}

// Component
const H3: React.FC<IProps> = ({ children }) => <H3Styles>{children}</H3Styles>;

// Prop types declaration
H3.propTypes = {
  children: PropTypes.string.isRequired,
};

export default H3;
