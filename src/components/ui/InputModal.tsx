// Import libraries
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components
import BackDrop from "./BackDrop";
import { CSSTransition } from "react-transition-group";

// Styles
const InputModalStyles = styled.div`
  width: 80%;
  height: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  z-index: 99;
  background-color: ${props => props.theme.colors.white};
  padding: 3rem;
  border-radius: 3rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  // &.opacity-enter {
  // // transform: translateX(-100%);
  // opacity: 0;
  // }

  // &.opacity-enter-active {
  // // transform: translateX(0);
  // opacity: 1;
  // transition: all 500ms;
  // }

  // &.opacity-exit {
  // // transform: translateX(0%);
  // opacity: 1;
  // }

  // &.opacity-exit-active {
  // // transform: translateX(-100%);
  // opacity: 0;
  // transition: all 500ms;
  // }
`;

// Interface
interface IProps {
  isOpen: boolean;
  toggleModal: () => void;
  children: JSX.Element;
}

// Component
const InputModal: React.FC<IProps> = props => {
  const htmlElement = document.getElementById("modal");

  // Typescript check safe
  if (!htmlElement) {
    throw new Error("Element not found!");
  }

  const elements = (
    <>
      {props.isOpen && <BackDrop toggleDrawer={props.toggleModal} />}
      <CSSTransition
        in={props.isOpen}
        timeout={500}
        classNames="opacity"
        mountOnEnter
        unmountOnExit>
        <InputModalStyles>{props.children}</InputModalStyles>
      </CSSTransition>
    </>
  );

  // return (
  // <>
  // <BackDrop toggleDrawer={props.toggleModal} />
  // <CSSTransition
  // in={props.isOpen}
  // timeout={500}
  // classNames="slide-in-left"
  // mountOnEnter
  // unmountOnExit>
  // <InputModalStyles>{props.children}</InputModalStyles>
  // </CSSTransition>
  // </>
  // );

  return ReactDOM.createPortal(elements, htmlElement);
};

// Prop types declaration
InputModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default InputModal;
