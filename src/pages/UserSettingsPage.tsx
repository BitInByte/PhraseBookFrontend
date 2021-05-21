// Import libraries
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components
import RegisterForm from "../components/auth/Register/RegisterForm";
import SectionWrapper from "../components/ui/SectionWrapper/SectionWrapper";
import UserSettingsForm from "../components/auth/UserSettings/UserSettingsForm";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../store/actions/actionTypes";
import Spinner from "../components/ui/Spinner/Spinner";
import MessageModal from "../components/ui/MessageModal/MessageModal";
import User from "../models/User";

// Styles
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
const UserSettingsPage: React.FC<IProps> = () => {
  const auth: IAuthState = useSelector((state: IStore) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setIsErrorMessage] = useState<string | null>(null);
  const [userInformation, setUserInformation] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInformation = async () => {
      let newUser: string | User;
      if (auth.token) {
        newUser = await User.fetchUserSettings(auth.token);
        if (newUser instanceof User) {
          setUserInformation({
            firstName: newUser.getFirstName(),
            lastName: newUser.getLastName(),
            email: newUser.getEmail(),
          });
          setIsLoading(false);
        } else {
          setIsErrorMessage(newUser);
        }
      }
    };
    fetchUserInformation();
  }, [auth.token, successMessage]);

  const changeLoadingHandler = (loadingStatus: boolean) => {
    setIsLoading(_ => loadingStatus);
  };

  const changeErrorHandler = (error: string) => {
    setIsErrorMessage(_ => error);
  };

  const clearErrorHandler = () => {
    setIsErrorMessage(null);
  };

  const changeSuccessMessageHandler = (message: string) => {
    setSuccessMessage(message);
  };

  const clearSuccessMessageHandler = () => {
    setSuccessMessage(null);
  };

  return (
    <SectionWrapper>
      <FormWrapper>
        <MessageModal
          isError
          message={errorMessage}
          clearError={clearErrorHandler}
        />
        <MessageModal
          message={successMessage}
          clearError={clearSuccessMessageHandler}
        />
        {isLoading && <Spinner withWrapper />}
        {auth.token && !isLoading && (
          <UserSettingsForm
            isLoading={auth.loading || isLoading}
            user={userInformation}
            changeLoading={changeLoadingHandler}
            token={auth.token}
            changeError={changeErrorHandler}
            changeSuccessMessage={changeSuccessMessageHandler}
          />
        )}
      </FormWrapper>
    </SectionWrapper>
  );
};

// Prop types declaration
UserSettingsPage.propTypes = {};

export default UserSettingsPage;
