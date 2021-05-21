// Import libraries
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components

// Styles
const CardContainer = styled.div`
  width: 55rem;
  padding: 3.5rem;
  border-radius: 2rem;
  margin: 1rem;
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.5);
`;

// Interface
interface IProps {
  children: JSX.Element[] | JSX.Element;
}

// Component
const Card: React.FC<IProps> = props => {
  return <CardContainer>{props.children}</CardContainer>;
};

// Prop types declaration
Card.propTypes = {
  // children: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
};

export default Card;
