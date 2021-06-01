// Import libraries
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

// Import components
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import SectionWrapper from "../components/ui/SectionWrapper";
import MessageModal from "../components/ui/MessageModal";
// import Spinner from "../components/ui/Spinner";
// import { finishSession } from "../store/actions/authAction";
// import actionTypes from "../store/actions/actionTypes";

// Styles
// const AuthWrapper = styled.div`
//   width: 100rem;
//   min-height: 100%;
//   display: flex;
//   justify-content: center;
//   padding: 6rem;
//   //align-items: center;
// `;

const FormWrapper = styled.div`
  width: 50%;
  display: flex;
  //justify-content: center;
  flex-direction: column;
  //align-items: center;
`;

// Interface
interface IProps {}

// Component
const AuthPage: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const [isRegisterMode, setRegisterMode] = useState(false);
  // const [showErrorModal, setShowErrorModal] = useState(false);
  console.log("MOUNTING AUTH PAGE");
  console.log(isRegisterMode);

  const auth: IAuthState = useSelector((state: IStore) => state.auth);

  // if (auth.error) {
  //   // The DOM will be empty at this moment, so we need to delay the modal to see the animation
  //   // setTimeout(() => {
  //   //   setShowErrorModal(true);
  //   // }, 200);
  //   // setTimeout(() => {
  //   //   setShowErrorModal(false);
  //   // }, 4800);
  //   const interval = setInterval(() => {
  //     console.log("Dispatching error clear");
  //     // Dispatch the clear error async action
  //     dispatch({
  //       type: actionTypes.AUTH_FINISH,
  //     });
  //     // Clear interval after action performed
  //     clearInterval(interval);
  //   }, 5000);
  // }

  const toggleRegistrationModeHandler = () => {
    setRegisterMode(prevState => !prevState);
  };

  let authForm;
  if (isRegisterMode) {
    authForm = (
      <RegisterForm
        onButtonPush={toggleRegistrationModeHandler}
        isLoading={!!auth.loading}
      />
    );
  } else {
    authForm = (
      <LoginForm
        onButtonPush={toggleRegistrationModeHandler}
        isLoading={!!auth.loading}
      />
    );
  }

  return (
    <>
      <MessageModal isError message={auth.error} />
      {/*{auth.loading && <Spinner />}*/}
      {/*{!auth.loading && (*/}
      <SectionWrapper>
        <FormWrapper>{authForm}</FormWrapper>
      </SectionWrapper>
      {/*)}*/}
    </>
  );
};

// Prop types declaration
AuthPage.propTypes = {};

export default AuthPage;
