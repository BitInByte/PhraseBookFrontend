// Import libraries
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components

// Styles
const BackDropModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

// Interface
interface IProps {
  toggleDrawer: () => void;
}

// Component
const BackDrop: React.FC<IProps> = props => {
  const { toggleDrawer } = props;

  const htmlElement = document.getElementById("backdrop-hook");

  //Typescript check safe
  if (!htmlElement) {
    throw new Error("Element not found");
  }

  return ReactDOM.createPortal(
    <BackDropModal onClick={toggleDrawer} />,
    htmlElement
  );
};

// Prop types declaration
BackDrop.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default BackDrop;
