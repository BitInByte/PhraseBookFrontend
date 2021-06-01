// Import libraries
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components

// Styles
const HomePageWrapper = styled.div`
  width: 100rem;
  min-height: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 6rem;
  align-items: center;
  flex-direction: column;
`;

// Interface
interface IProps {}

// Component
const SectionWrapper: React.FC<IProps> = ({ children }) => (
  <HomePageWrapper>{children} </HomePageWrapper>
);

// Prop types declaration
SectionWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SectionWrapper;
