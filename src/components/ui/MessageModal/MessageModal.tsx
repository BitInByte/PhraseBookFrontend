// Import libraries
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { authTypes } from "../../../store/actions/actionTypes";
import { useDispatch } from "react-redux";

// Import components

// Styles
interface IStyled {
  isError?: boolean;
}
const MessageModalWrapper = styled.div<IStyled>`
  position: fixed;
  top: 7vh;
  left: 10%;
  width: 80%;
  padding: 4rem;
  z-index: 10;
  border-radius: 2rem;
  background-color: ${props =>
    props.isError ? props.theme.colors.bgRed : props.theme.colors.bgGreen};
  color: ${props =>
    props.isError ? props.theme.colors.red : props.theme.colors.green};
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Interface
interface IProps extends IStyled {
  message?: string | null;
  // showModal: boolean;
}

// Component
const MessageModal: React.FC<IProps> = ({ message, isError }) => {
  const dispatch = useDispatch();
  const elementId = "message-modal-hook";
  const htmlElement = document.getElementById(elementId);

  if (!htmlElement) {
    throw new Error(`Element ${elementId} not found!`);
  }

  if (message) {
    // The DOM will be empty at this moment, so we need to delay the modal to see the animation
    // setTimeout(() => {
    //   setShowErrorModal(true);
    // }, 200);
    // setTimeout(() => {
    //   setShowErrorModal(false);
    // }, 4800);
    const interval = setInterval(() => {
      console.log("Dispatching error clear");
      // Dispatch the clear error async action
      dispatch({
        type: authTypes.AUTH_FINISH,
      });
      // Clear interval after action performed
      clearInterval(interval);
    }, 5000);
  }

  const reactElement = (
    <CSSTransition
      //  !!message is the same than message ? true : false
      in={!!message}
      timeout={500}
      classNames="modal"
      mountOnEnter
      unmountOnExit>
      <MessageModalWrapper isError={isError}>{message}</MessageModalWrapper>
    </CSSTransition>
  );

  return ReactDOM.createPortal(reactElement, htmlElement);
};

// Prop types declaration
MessageModal.propTypes = {
  isError: PropTypes.bool,
  message: PropTypes.string,
};

export default MessageModal;
