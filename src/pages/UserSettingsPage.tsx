// Import libraries
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components
import RegisterForm from "../components/auth/Register/RegisterForm";
import SectionWrapper from "../components/ui/SectionWrapper/SectionWrapper";
import UserSettingsForm from "../components/auth/UserSettings/UserSettingsForm";
import { useDispatch, useSelector } from "react-redux";
import { authTypes } from "../store/actions/actionTypes";
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
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const auth: IAuthState = useSelector((state: IStore) => state.auth);
  let currentUser;
  const getUsers = async () => {
    if (auth.token) {
      currentUser = await User.fetchUserSettings(auth.token);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SectionWrapper>
      <FormWrapper>
        {!auth.loading &&
          !isLoading &&
          // @ts-ignore
          currentUser(
            <UserSettingsForm
              isLoading={auth.loading || isLoading}
              // @ts-ignore
              user={currentUser}
            />
          )}
      </FormWrapper>
    </SectionWrapper>
  );
};

// Prop types declaration
UserSettingsPage.propTypes = {};

export default UserSettingsPage;
