// Import libraries
import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components
import LoginForm from "../components/auth/Login/LoginForm";
import RegisterForm from "../components/auth/Register/RegisterForm";

// Styles
const AuthWrapper = styled.div`
  width: 100rem;
  min-height: 100%;
  display: flex;
  justify-content: center;
  padding: 6rem;
  //align-items: center;
`;

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
  const [isRegisterMode, setRegisterMode] = useState(false);

  const toggleRegistrationModeHandler = () => {
    setRegisterMode(prevState => !prevState);
  };

  return (
    <AuthWrapper>
      <FormWrapper>
        {isRegisterMode ? (
          <RegisterForm onButtonPush={toggleRegistrationModeHandler} />
        ) : (
          <LoginForm onButtonPush={toggleRegistrationModeHandler} />
        )}
      </FormWrapper>
    </AuthWrapper>
  );
};

// Prop types declaration
AuthPage.propTypes = {};

export default AuthPage;
